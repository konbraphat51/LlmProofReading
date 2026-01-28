import { ref, reactive } from 'vue';
import type { Settings, Correction, ChatMessage } from '../types';
import { openAIService } from '../services/openai';

const DEFAULT_SETTINGS: Settings = {
  apiKey: '',
  model: 'gpt-4o-mini',
  documentPurpose: '',
  correctionPolicy: '',
  uiLanguage: 'en'
};

// Load settings from localStorage
const loadSettings = (): Settings => {
  const stored = localStorage.getItem('llm-proofreading-settings');
  if (stored) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  }
  return { ...DEFAULT_SETTINGS };
};

// State
const text = ref('');
const corrections = ref<Correction[]>([]);
const chatHistory = ref<ChatMessage[]>([]);
const settings = reactive<Settings>(loadSettings());
const isAnalyzing = ref(false);
const isChatting = ref(false);
const showSettings = ref(false);
const hoveredCorrection = ref<string | null>(null);

export function useAppState() {
  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('llm-proofreading-settings', JSON.stringify(settings));
    if (settings.apiKey) {
      openAIService.initialize(settings.apiKey);
    }
  };

  // Initialize OpenAI service if API key exists
  if (settings.apiKey) {
    openAIService.initialize(settings.apiKey);
  }

  // Analyze text for micro corrections
  const analyzeMicroCorrections = async () => {
    if (!text.value.trim()) {
      corrections.value = [];
      return;
    }

    if (!settings.apiKey) {
      alert('Please set your OpenAI API key in settings');
      return;
    }

    isAnalyzing.value = true;
    try {
      corrections.value = await openAIService.analyzeMicroCorrections(
        text.value,
        settings
      );
    } catch (error) {
      console.error('Error analyzing text:', error);
      alert('Failed to analyze text. Please check your API key and try again.');
    } finally {
      isAnalyzing.value = false;
    }
  };

  // Get macro review
  const getMacroReview = async (userMessage: string) => {
    if (!text.value.trim()) {
      alert('Please enter some text first');
      return;
    }

    if (!settings.apiKey) {
      alert('Please set your OpenAI API key in settings');
      return;
    }

    isChatting.value = true;
    
    // Add user message to chat history
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    chatHistory.value.push(userMsg);

    try {
      const response = await openAIService.getMacroReview(
        text.value,
        chatHistory.value.slice(0, -1), // Don't include the just-added message
        settings,
        userMessage
      );

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      chatHistory.value.push(assistantMsg);
    } catch (error) {
      console.error('Error getting macro review:', error);
      alert('Failed to get review. Please check your API key and try again.');
      // Remove the user message that was just added
      chatHistory.value.pop();
    } finally {
      isChatting.value = false;
    }
  };

  // Clear chat history
  const clearChatHistory = () => {
    chatHistory.value = [];
  };

  // Apply correction
  const applyCorrection = (correction: Correction) => {
    const before = text.value.substring(0, correction.start);
    const after = text.value.substring(correction.end);
    text.value = before + correction.suggestion + after;

    // Remove applied correction
    corrections.value = corrections.value.filter(c => c.id !== correction.id);
  };

  // Ignore correction
  const ignoreCorrection = (correctionId: string) => {
    corrections.value = corrections.value.filter(c => c.id !== correctionId);
  };

  return {
    // State
    text,
    corrections,
    chatHistory,
    settings,
    isAnalyzing,
    isChatting,
    showSettings,
    hoveredCorrection,

    // Actions
    saveSettings,
    analyzeMicroCorrections,
    getMacroReview,
    clearChatHistory,
    applyCorrection,
    ignoreCorrection
  };
}
