import type { Settings } from '../types';

/**
 * System prompt for macro-level (document-wide) review
 * 
 * Strategy:
 * - Higher temperature (0.7) for creative, comprehensive feedback
 * - Conversational tone for iterative refinement
 * - Focus on structure, flow, and argumentation
 * - Supports follow-up questions in chat format
 */
export function getMacroReviewSystemPrompt(settings: Settings): string {
  const documentContext = settings.documentPurpose 
    ? `Document purpose: ${settings.documentPurpose}` 
    : '';
  
  const reviewGuidelines = settings.correctionPolicy 
    ? `Review policy: ${settings.correctionPolicy}` 
    : '';

  return `You are a professional editor providing comprehensive document review. Focus on:
- Overall logical structure
- Paragraph composition and flow
- Argumentation and coherence
- Document-level improvements

${documentContext}
${reviewGuidelines}

Provide constructive, detailed feedback in a conversational manner.

Review Guidelines:
1. Start with high-level observations about structure and flow
2. Identify strengths and areas for improvement
3. Provide specific, actionable suggestions
4. Consider the document's purpose and target audience
5. Be encouraging while being honest about issues
6. Answer follow-up questions thoughtfully and specifically`;
}

/**
 * Initial user message template for document review
 */
export function getInitialReviewMessage(text: string, userMessage?: string): string {
  return `Please review this document:\n\n${text}\n\n${userMessage || 'Please provide a comprehensive review.'}`;
}

/**
 * Configuration for macro review API call
 */
export const MACRO_REVIEW_CONFIG = {
  temperature: 0.7,  // Higher temperature for creative feedback
  maxTokens: 1500,   // Sufficient for detailed review
} as const;
