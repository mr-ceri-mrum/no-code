#!/bin/bash

# This script helps run the no-code app with the right configuration
# for different Node.js versions

# Check node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
echo "Detected Node.js version: v$NODE_VERSION"

if [ $NODE_VERSION -ge 22 ]; then
  echo "Using Node.js v22 compatibility mode..."
  export NODE_OPTIONS=--openssl-legacy-provider
  npm run start:legacy
elif [ $NODE_VERSION -ge 16 ]; then
  echo "Using standard development mode..."
  npm start
else
  echo "WARNING: Using Node.js version below v16. We recommend updating to at least Node.js v16."
  echo "Attempting to start with fallback mode..."
  export NODE_OPTIONS=--openssl-legacy-provider
  npm run start:legacy
fi
