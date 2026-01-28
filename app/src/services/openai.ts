import OpenAI from 'openai';
import type { Correction, ChatMessage, Settings } from '../types';
import {
  getMicroCorrectionsSystemPrompt,
  getMacroReviewSystemPrompt,
  getInitialReviewMessage,
  MICRO_CORRECTIONS_CONFIG,
  MACRO_REVIEW_CONFIG
} from '../prompts';

export class OpenAIService {
  private client: OpenAI | null = null;

  initialize(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // For demo purposes; in production, use a backend
    });
  }

  async analyzeMicroCorrections(
    text: string,
    settings: Settings
  ): Promise<Correction[]> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    const systemPrompt = getMicroCorrectionsSystemPrompt(settings);

    const response = await this.client.chat.completions.create({
      model: settings.model || 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: MICRO_CORRECTIONS_CONFIG.temperature
    });

    const content = response.choices[0]?.message?.content || '[]';
    
    try {
      const corrections = JSON.parse(content);
      return corrections.map((c: any, index: number) => ({
        id: `correction-${Date.now()}-${index}`,
        ...c
      }));
    } catch (e) {
      console.error('Failed to parse corrections:', e);
      return [];
    }
  }

  async getMacroReview(
    text: string,
    chatHistory: ChatMessage[],
    settings: Settings,
    userMessage: string
  ): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    const systemPrompt = getMacroReviewSystemPrompt(settings);

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt }
    ];

    // Add chat history
    if (chatHistory.length === 0) {
      messages.push({
        role: 'user',
        content: getInitialReviewMessage(text, userMessage)
      });
    } else {
      // Add previous chat history
      chatHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
      // Add new user message
      messages.push({
        role: 'user',
        content: userMessage
      });
    }

    const response = await this.client.chat.completions.create({
      model: settings.model || 'gpt-4',
      messages,
      temperature: MACRO_REVIEW_CONFIG.temperature
    });

    return response.choices[0]?.message?.content || 'No response received.';
  }
}

export const openAIService = new OpenAIService();
