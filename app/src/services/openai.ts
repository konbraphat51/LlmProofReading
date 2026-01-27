import OpenAI from 'openai';
import type { Correction, ChatMessage, Settings } from '../types';

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

    const systemPrompt = `You are a professional proofreading assistant. Analyze the following text and identify corrections needed.
${settings.documentPurpose ? `Document purpose: ${settings.documentPurpose}` : ''}
${settings.correctionPolicy ? `Correction policy: ${settings.correctionPolicy}` : ''}

Return a JSON array of corrections with this exact format:
[
  {
    "type": "grammar" or "effectiveness",
    "start": number (character position),
    "end": number (character position),
    "original": "original text",
    "suggestion": "corrected text",
    "reason": "reason for correction"
  }
]

Only return the JSON array, nothing else.`;

    const response = await this.client.chat.completions.create({
      model: settings.model || 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: 0.3
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

    const systemPrompt = `You are a professional editor providing comprehensive document review. Focus on:
- Overall logical structure
- Paragraph composition and flow
- Argumentation and coherence
- Document-level improvements

${settings.documentPurpose ? `Document purpose: ${settings.documentPurpose}` : ''}
${settings.correctionPolicy ? `Review policy: ${settings.correctionPolicy}` : ''}

Provide constructive, detailed feedback in a conversational manner.`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt }
    ];

    // Add chat history
    if (chatHistory.length === 0) {
      messages.push({
        role: 'user',
        content: `Please review this document:\n\n${text}\n\n${userMessage || 'Please provide a comprehensive review.'}`
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
      temperature: 0.7
    });

    return response.choices[0]?.message?.content || 'No response received.';
  }
}

export const openAIService = new OpenAIService();
