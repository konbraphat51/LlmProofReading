# LlmProofReading

A Grammarly-like GUI for LLM-based proofreading software powered by Vue 3 + TypeScript + OpenAI.

![LLM Proofreading](./screenshot.png)

## Features

### 📝 Macro Correction (Document-Level Review)
- Comprehensive review of overall logical structure, paragraph composition, and argumentation
- Interactive chat interface for iterative feedback
- Chat history management with clear button
- Conversational interaction with the AI reviewer

### 🔍 Micro Correction (Sentence-Level Review)
- Real-time sentence and word-level suggestions
- Visual underlines with hover tooltips
- Two types of corrections:
  - **Grammar** (red underline): Grammar and syntax errors
  - **Effectiveness** (blue underline): Suggestions for more natural and effective writing
- Correction cards panel for easy review and management
- One-click apply or ignore functionality

### ⚙️ Customizable Settings
- OpenAI API key configuration
- Model selection (GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo)
- Document purpose specification (e.g., academic paper, business email, blog post)
- Correction policy customization
- UI language toggle (English/日本語)

## Quick Start

```bash
cd app
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Usage

1. **Configure Settings**: Click the ⚙️ Settings button and enter your OpenAI API key
2. **Enter Text**: Type or paste your text in the main editor
3. **Get Micro Corrections**: Click "Analyze Text" for sentence-level suggestions
4. **Get Macro Review**: Click "Get Document Review" for comprehensive feedback
5. **Review Suggestions**: 
   - Hover over underlined text to see details
   - Use the right panel to apply or ignore corrections
6. **Chat for More**: Continue the conversation in the document review panel

## Project Structure

```
app/
├── src/
│   ├── components/          # Vue components
│   │   ├── TextEditor.vue           # Main text editor with underlines
│   │   ├── CorrectionsPanel.vue     # Right sidebar with correction cards
│   │   ├── MacroPanel.vue           # Left sidebar with chat interface
│   │   └── SettingsModal.vue        # Settings configuration
│   ├── composables/         # Vue composables
│   │   └── useAppState.ts           # Application state management
│   ├── services/            # External services
│   │   └── openai.ts                # OpenAI API integration
│   ├── types/               # TypeScript types
│   │   └── index.ts                 # Type definitions
│   ├── i18n/                # Internationalization
│   │   └── index.ts                 # English/Japanese translations
│   ├── App.vue              # Main application component
│   ├── main.ts              # Application entry point
│   └── style.css            # Global styles
├── package.json
└── vite.config.ts
```

## Technology Stack

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **OpenAI API**: LLM integration for proofreading

## Security Considerations

⚠️ **Important**: This demo uses `dangerouslyAllowBrowser: true` to allow OpenAI SDK to run directly in the browser. For production environments, implement a backend server to:
- Securely store and manage API keys
- Handle OpenAI API calls server-side
- Implement rate limiting and usage tracking
- Add user authentication and authorization

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
