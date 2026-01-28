# LLM Proofreading

A Grammarly-like GUI for LLM-based proofreading powered by Vue 3 + TypeScript + OpenAI.

## Features

### Macro Correction
- Document-level review focusing on overall structure, paragraph composition, and argumentation
- Interactive chat interface for comprehensive feedback
- Chat history with clear button

### Micro Correction
- Sentence and word-level suggestions with visual underlines
- Two types of corrections:
  - **Grammar** (red underline): Grammar and syntax corrections
  - **Effectiveness** (blue underline): Suggestions to make writing more natural and effective
- Hover tooltips showing correction details
- Right panel with correction cards for easy review
- Apply or ignore individual corrections

### Settings
- OpenAI API key configuration
- Model selection (GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo)
- Document purpose and correction policy customization
- UI language toggle (English/Japanese)

## Setup

1. Install pnpm if not already installed:
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

3. Run development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

## Prompt Management

All LLM prompts are centrally managed in `src/prompts/`:
- `prompts/microCorrections.ts` - Sentence-level correction prompts
- `prompts/macroReview.ts` - Document-level review prompts
- `prompts/index.ts` - Export hub

For detailed prompt engineering strategy, see [../docs/LLM_STRATEGY.md](../docs/LLM_STRATEGY.md)

## Usage

1. Click the settings button (⚙️) to configure your OpenAI API key
2. Enter your text in the main editor
3. Click "Analyze Text" to get micro-level corrections
4. Click "Get Document Review" for macro-level feedback
5. Hover over underlined text to see correction suggestions
6. Use the right panel to apply or ignore corrections

## Configuration

The application stores settings in browser localStorage, including:
- API key (encrypted in browser)
- Preferred model
- Document purpose
- Correction policy
- UI language preference

## Security Note

This demo application uses `dangerouslyAllowBrowser: true` for the OpenAI SDK to run in the browser. For production use, implement a backend server to handle API calls securely.
