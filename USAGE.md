# LLM Proofreading - Usage Guide

## Getting Started

### 1. Installation

```bash
cd app
npm install
```

### 2. Configuration

Before using the application, you need to configure your OpenAI API key:

1. Start the development server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Click the **⚙️ Settings** button in the top-right corner
4. Enter your OpenAI API key (starts with `sk-...`)
5. Select your preferred model (GPT-4o Mini is recommended for cost-effectiveness)
6. Click **Save Settings**

### 3. Optional Configuration

You can also customize:
- **Document Purpose**: Helps the LLM understand the context (e.g., "Academic research paper", "Marketing email", "Blog post")
- **Correction Policy**: Specific guidelines for corrections (e.g., "Focus on clarity and conciseness", "Maintain formal tone")
- **UI Language**: Switch between English and Japanese

## Features Guide

### Micro Corrections (Sentence-Level)

Micro corrections help you improve individual sentences and words.

**How to use:**
1. Type or paste your text in the main editor
2. Click **Analyze Text**
3. Wait for the analysis to complete (this may take a few seconds)
4. Review the underlined suggestions:
   - **Red underlines** = Grammar errors (spelling, punctuation, verb tenses, etc.)
   - **Blue underlines** = Effectiveness suggestions (better word choice, clearer phrasing, etc.)

**Interacting with suggestions:**
- **Hover** over any underlined text to see a quick tooltip with the suggestion
- **View details** in the right panel "Suggestions" section
- **Apply** a suggestion by clicking the "Apply" button
- **Ignore** a suggestion by clicking the "Ignore" button

### Macro Review (Document-Level)

Macro review provides comprehensive feedback on your entire document.

**How to use:**
1. Make sure your text is in the editor
2. Click **Get Document Review** in the left panel
3. Wait for the AI to analyze your document
4. Read the comprehensive review in the chat interface
5. Ask follow-up questions by typing in the chat input
6. Click **Send** to continue the conversation

**Use cases:**
- "How can I improve the flow between paragraphs?"
- "Is my argumentation clear and logical?"
- "What's the overall tone of this document?"
- "How can I make the introduction more engaging?"

**Clear chat history:**
- Click the **Clear Chat** button to start a fresh review

## Tips for Best Results

### For Micro Corrections:
1. **Paste shorter texts** (1-3 paragraphs) for faster analysis
2. **Review all suggestions** - the LLM may sometimes be overly cautious
3. **Use document purpose** to get context-appropriate suggestions
4. **Analyze iteratively** - apply some corrections and re-analyze for better results

### For Macro Review:
1. **Provide complete documents** for comprehensive feedback
2. **Set document purpose** to get relevant structural advice
3. **Ask specific questions** in follow-up chat messages
4. **Iterate on feedback** - implement suggestions and ask for a re-review

### Model Selection:
- **GPT-4o**: Best quality, highest cost
- **GPT-4o Mini**: Great balance of quality and cost (recommended)
- **GPT-4 Turbo**: Good for long documents
- **GPT-3.5 Turbo**: Fastest and cheapest, but lower quality

## Common Workflows

### Academic Writing Workflow
1. Set document purpose: "Academic research paper"
2. Set correction policy: "Maintain formal academic tone, focus on clarity"
3. Paste a paragraph or section
4. Click "Analyze Text" for micro corrections
5. Apply grammar corrections
6. Review effectiveness suggestions for clarity improvements
7. Use "Get Document Review" for overall structure feedback

### Business Email Workflow
1. Set document purpose: "Professional business email"
2. Set correction policy: "Concise, professional, clear"
3. Paste your email draft
4. Click "Analyze Text"
5. Apply corrections to ensure professionalism
6. Use macro review to check tone and clarity

### Creative Writing Workflow
1. Set document purpose: "Creative fiction/blog post"
2. Set correction policy: "Preserve author's voice, focus on readability"
3. Work on one section at a time
4. Use effectiveness suggestions to enhance impact
5. Get macro feedback on flow and engagement

## Keyboard Shortcuts

- **Enter** in chat input: Send message
- **Click outside modal**: Close settings modal

## Troubleshooting

### "Please set your OpenAI API key in settings"
- You need to configure your API key in settings first
- Make sure the key starts with `sk-`
- Click "Save Settings" after entering the key

### "Failed to analyze text"
- Check your internet connection
- Verify your API key is valid
- Check if you have API credits in your OpenAI account
- Try a smaller text snippet

### No corrections appearing
- The LLM might not have found any issues (congratulations!)
- Try different text with known errors to test
- Ensure your API key is correctly configured

### Analysis taking too long
- Longer texts take more time to analyze
- GPT-4 models are slower than GPT-3.5
- Consider using GPT-4o Mini for faster results
- Try analyzing smaller chunks of text

## Privacy & Security

⚠️ **Important Notes:**
- Your API key is stored in your browser's localStorage
- API calls are made directly from your browser to OpenAI
- Your text is sent to OpenAI for analysis
- This is a demo application - for production use, implement a backend server

## Cost Considerations

Using this application costs money based on OpenAI's API pricing:
- Each analysis uses tokens based on your text length
- Macro reviews typically use more tokens than micro corrections
- GPT-4 models are more expensive than GPT-3.5
- Monitor your usage in your OpenAI dashboard

Approximate costs (as of 2024):
- Short paragraph analysis (GPT-4o Mini): $0.001-0.003
- Document review (GPT-4o Mini): $0.005-0.02
- Long document with chat (GPT-4o): $0.05-0.20

## Support

For issues or questions:
- Check this usage guide
- Review the README.md for technical details
- Open an issue on GitHub
- Check OpenAI's API status page for service issues
