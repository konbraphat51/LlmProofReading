# LlmProofReading

A Grammarly-like GUI for LLM-based proofreading software powered by Vue 3 + TypeScript + OpenAI.

## Screenshots

### Main Interface
![Initial State](https://github.com/user-attachments/assets/3cef39e7-e202-4b4a-99ae-c374e80c4316)

### Settings Panel
![Settings Modal](https://github.com/user-attachments/assets/cdb994b5-be38-44d4-8d62-628f2ef80be9)

### Japanese UI Support
![Japanese UI](https://github.com/user-attachments/assets/e0be8db3-2bd9-447e-91df-d1b0a9015989)

### Text with Corrections (Demo)
![Demo with Corrections](https://github.com/user-attachments/assets/d0b7419d-b203-4ca9-90c6-4da35530a548)
*Demo showing how grammar (red) and effectiveness (blue) corrections appear with detailed suggestions*

## Features

### 📝 Macro Correction (Document-Level Review)
- **Comprehensive Review**: Get AI-powered feedback on overall logical structure, paragraph composition, and argumentation
- **Interactive Chat Interface**: Engage in iterative conversations with the AI reviewer
- **Chat History Management**: Review previous suggestions and continue the conversation
- **Clear Chat Button**: Start fresh conversations anytime

### 🔍 Micro Correction (Sentence-Level Review)
- **Real-time Analysis**: Sentence and word-level suggestions powered by LLM
- **Visual Underlines**: 
  - **Grammar** corrections (red underline): Grammar and syntax errors
  - **Effectiveness** suggestions (blue underline): Improvements for more natural and effective writing
- **Hover Tooltips**: See correction details instantly by hovering over underlined text
- **Correction Cards Panel**: Browse all suggestions in an organized right sidebar
- **One-Click Actions**: Apply or ignore individual corrections with a single click

### ⚙️ Customizable Settings
- **OpenAI API Key**: Securely configure your API key
- **Model Selection**: Choose from GPT-4o, GPT-4o Mini, GPT-4 Turbo, or GPT-3.5 Turbo
- **Document Purpose**: Specify the type of document (e.g., academic paper, business email, blog post)
- **Correction Policy**: Define custom guidelines for the LLM reviewer
- **UI Language**: Toggle between English and Japanese (本文の言語とは別)

## Quick Start

```bash
# Navigate to app directory
cd app

# Install pnpm if not already installed
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Then open http://localhost:5173 in your browser.

## Usage Guide

1. **Configure Settings**: 
   - Click the ⚙️ Settings button in the top-right corner
   - Enter your OpenAI API key
   - Select your preferred model
   - (Optional) Set document purpose and correction policy
   - Choose your UI language

2. **Enter Text**: 
   - Type or paste your text in the main editor

3. **Get Micro Corrections**: 
   - Click "Analyze Text" to get sentence-level suggestions
   - Red underlines indicate grammar errors
   - Blue underlines suggest effectiveness improvements
   - Hover over underlined text to see quick details
   - Use the right panel to apply or ignore corrections

4. **Get Macro Review**: 
   - Click "Get Document Review" for comprehensive document-level feedback
   - Chat with the AI to discuss specific aspects
   - Use "Clear Chat" to start a new review session

## Project Structure

```
app/
├── src/
│   ├── components/              # Vue components
│   │   ├── TextEditor.vue       # Main text editor with underline highlights
│   │   ├── CorrectionsPanel.vue # Right sidebar with correction cards
│   │   ├── MacroPanel.vue       # Left sidebar with chat interface
│   │   └── SettingsModal.vue    # Settings configuration modal
│   ├── composables/             # Vue composables
│   │   └── useAppState.ts       # Application state management
│   ├── services/                # External services
│   │   └── openai.ts            # OpenAI API integration
│   ├── prompts/                 # LLM prompt templates
│   │   ├── index.ts             # Export hub
│   │   ├── microCorrections.ts  # Micro corrections prompts
│   │   └── macroReview.ts       # Macro review prompts
│   ├── types/                   # TypeScript types
│   │   └── index.ts             # Type definitions
│   ├── i18n/                    # Internationalization
│   │   └── index.ts             # English/Japanese translations
│   ├── App.vue                  # Main application component
│   ├── main.ts                  # Application entry point
│   └── style.css                # Global styles
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

## Technology Stack

- **Vue 3**: Progressive JavaScript framework with Composition API
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **OpenAI API**: LLM integration for intelligent proofreading

## Features Breakdown

### Macro Corrections
The macro correction feature provides document-level feedback by:
- Analyzing overall document structure
- Evaluating paragraph flow and composition
- Assessing argumentation and coherence
- Providing actionable suggestions for improvement

The chat interface allows you to:
- Ask follow-up questions
- Request clarification on specific points
- Discuss alternative approaches
- Iteratively refine your document

### Micro Corrections
The micro correction feature identifies:
- **Grammar Issues**: Spelling, punctuation, verb tenses, subject-verb agreement
- **Effectiveness Improvements**: Word choice, sentence structure, clarity, conciseness

Each correction includes:
- The original text
- A suggested replacement
- A clear explanation of why the change is recommended

## Security Considerations

⚠️ **Important**: This demo uses `dangerouslyAllowBrowser: true` to allow the OpenAI SDK to run directly in the browser. 

**For production environments**, you should:
- Implement a backend server to handle API calls
- Store API keys securely on the server (never in the browser)
- Add rate limiting and usage tracking
- Implement user authentication and authorization
- Use environment variables for sensitive configuration

## Build for Production

```bash
cd app
pnpm build
```

The built files will be in the `app/dist` directory, ready to be deployed to any static hosting service.

## Development

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install dependencies
cd app
pnpm install

# Run development server with hot reload
pnpm dev

# Type-check and build for production
pnpm build

# Preview production build
pnpm preview
```

## LLM Prompt Strategy

All LLM prompts are centrally managed in `app/src/prompts/` for easy maintenance and version control.

For detailed information about prompt engineering strategy, temperature settings, and best practices, see [LLM Strategy Documentation](docs/LLM_STRATEGY.md).

## Requirements

- Node.js 18+ 
- pnpm (install with `npm install -g pnpm`)
- OpenAI API key

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Built with modern web technologies:
- Vue 3 for reactive UI
- TypeScript for type safety
- Vite for fast development
- OpenAI for intelligent proofreading
