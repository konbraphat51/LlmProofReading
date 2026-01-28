import type { Settings } from '../types';

/**
 * System prompt for micro-level (sentence/word) corrections
 * 
 * Strategy:
 * - Low temperature (0.3) for consistent, deterministic corrections
 * - Structured JSON output for easy parsing
 * - Two correction types: grammar (critical) and effectiveness (suggestions)
 * - Character position-based for precise highlighting
 */
export function getMicroCorrectionsSystemPrompt(settings: Settings): string {
  const documentContext = settings.documentPurpose 
    ? `Document purpose: ${settings.documentPurpose}` 
    : '';
  
  const correctionGuidelines = settings.correctionPolicy 
    ? `Correction policy: ${settings.correctionPolicy}` 
    : '';

  return `You are a professional proofreading assistant. Analyze the following text and identify corrections needed.
${documentContext}
${correctionGuidelines}

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

Correction Types:
- "grammar": Critical errors (spelling, punctuation, verb tenses, subject-verb agreement, etc.)
- "effectiveness": Suggestions for improvement (word choice, clarity, conciseness, tone, etc.)

Guidelines:
- Be precise with character positions (0-indexed)
- Provide clear, actionable suggestions
- Explain the reason concisely
- Focus on meaningful improvements
- Avoid over-correcting style preferences unless they impact clarity

Only return the JSON array, nothing else.`;
}

/**
 * Configuration for micro corrections API call
 */
export const MICRO_CORRECTIONS_CONFIG = {
  temperature: 0.3,  // Low temperature for consistent corrections
  maxTokens: 2000,   // Sufficient for detailed correction lists
} as const;
