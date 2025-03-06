# No-Code AI Assistant Builder

A simple no-code application for creating AI assistants without backend requirements. Easily integrate with Telegram bots and OpenAI APIs to create custom conversational flows.

![No-Code AI Assistant Builder](https://github.com/mr-ceri-mrum/no-code/raw/main/screenshots/banner.jpg)

## Features

- **No Backend Required**: Runs entirely in the browser with local storage
- **Visual Flow Builder**: Create complex AI workflows using an intuitive drag-and-drop interface
- **Telegram Bot Integration**: Connect your Telegram bots to AI models
- **OpenAI API Integration**: Use GPT models to power your assistant's intelligence
- **Custom Flow Logic**: Build sophisticated conversation flows with conditions and branching

## Core Components

### 1. Telegram Integration

The application includes a comprehensive Telegram bot integration, allowing you to:

- Create and manage multiple Telegram bots
- Connect to the Telegram Bot API
- Configure webhooks or long polling
- Set up message filters and command handlers
- Design rich responses with text, media, and interactive buttons

### 2. Visual Flow Builder

Build your assistant logic with a visual flow editor:

- Drag-and-drop node-based editor
- Connect nodes to create conversation flows
- Telegram input and output nodes
- AI processing nodes
- Conditional logic and branching

### 3. OpenAI Integration

Connect to OpenAI's powerful models:

- API key and organization management
- Model selection
- Parameter configuration (temperature, max tokens, etc.)
- Prompt template editing

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`
4. Open your browser to `http://localhost:3000`

## Setup Telegram Bot Integration

1. Create a new bot with @BotFather on Telegram
2. Copy your bot token
3. Use the Telegram Integration component to configure your bot
4. Build your conversation flow in the flow editor
5. Deploy and test your assistant

## Project Structure

```
├── public/                 # Static assets
└── src/                    # Source code
    ├── components/         # React components
    │   ├── integrations/   # Integration components (Telegram, OpenAI)
    │   └── nodes/          # Flow builder node components
    ├── pages/              # Main application pages
    └── App.js              # Main application component
```

## Dependencies

- React
- Material-UI
- ReactFlow
- Telegraf
- OpenAI API

## License

MIT
