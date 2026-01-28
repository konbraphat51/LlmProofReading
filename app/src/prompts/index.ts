/**
 * Centralized Prompt Management
 * 
 * This module exports all prompts used in the LLM Proofreading application.
 * All prompt templates and configurations are defined here for easy maintenance
 * and version control.
 */

export { 
  getMicroCorrectionsSystemPrompt, 
  MICRO_CORRECTIONS_CONFIG 
} from './microCorrections';

export { 
  getMacroReviewSystemPrompt, 
  getInitialReviewMessage,
  MACRO_REVIEW_CONFIG 
} from './macroReview';
