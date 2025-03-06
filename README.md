# No-Code AI Assistant Builder

A simple no-code application for creating AI assistants without backend requirements. Easily integrate with Telegram bots and OpenAI APIs to create custom conversational flows.

## Features

- **No Backend Required**: Runs entirely in the browser with local storage
- **Visual Flow Builder**: Create complex AI workflows using an intuitive drag-and-drop interface
- **Telegram Bot Integration**: Connect your Telegram bots to AI models
- **OpenAI API Integration**: Use GPT models to power your assistant's intelligence
- **Custom Flow Logic**: Build sophisticated conversation flows with conditions and branching

## Getting Started

1. Clone this repository
```
git clone https://github.com/mr-ceri-mrum/no-code.git
cd no-code
```

2. Install dependencies
```
npm install
```

3. Start the development server (easiest method)
```
# Make the start script executable
chmod +x start.sh

# Run the start script which automatically detects your Node.js version
# and uses the appropriate configuration
./start.sh
```

4. Open your browser to `http://localhost:3000`

## Running with Node.js v22

If you're using Node.js v22, you may need to follow these special instructions to get the project running correctly:

### Option 1 (Recommended): Use the start script
The easiest way is to use our start script which automatically detects your Node.js version:
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Use an earlier version of Node.js
We recommend using Node.js v16, v18, or v20 which have better compatibility with the dependencies:

Using nvm (Node Version Manager):
```bash
# Install NVM if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Install and use Node.js v16
nvm install 16
nvm use 16

# Then install dependencies and start the app
npm install
npm start
```

### Option 3: Use Legacy SSL Provider with Node.js v22
If you want to stay with Node.js v22, you can use the legacy OpenSSL provider option:

```bash
# Install dependencies
npm install

# Start with legacy OpenSSL provider
npm run start:legacy
```

### Option 4: For Advanced Users

If you're experiencing specific errors, you can try:

1. Clear the node_modules folder and reinstall with --force:
```bash
rm -rf node_modules
npm install --force
```

2. Update your Node.js environment variables:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

3. If you're getting "ERR_OSSL_EVP_UNSUPPORTED" errors, add this to your .bashrc or .zshrc:
```bash
export NODE_OPTIONS=--openssl-legacy-provider --no-experimental-fetch
```

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
    ├── services/           # Browser-compatible services
    └── App.js              # Main application component
```

## Dependencies

- React
- Material-UI
- ReactFlow
- Browser-compatible services for Telegram and OpenAI integrations

## License

MIT
