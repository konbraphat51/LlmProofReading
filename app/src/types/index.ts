// Types for the LLM ProofReading application

export interface Correction {
  id: string;
  type: 'grammar' | 'effectiveness';
  start: number;
  end: number;
  original: string;
  suggestion: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Settings {
  apiKey: string;
  model: string;
  documentPurpose: string;
  correctionPolicy: string;
  uiLanguage: 'en' | 'ja';
}

export interface AppState {
  text: string;
  corrections: Correction[];
  chatHistory: ChatMessage[];
  settings: Settings;
  isAnalyzing: boolean;
  isChatting: boolean;
}
