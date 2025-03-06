@echo off
:: This script helps run the no-code app with the right configuration
:: for different Node.js versions on Windows

:: Check node version
FOR /F "tokens=1,2,3 delims=." %%a IN ('node -v') DO (
  SET NODE_MAJOR=%%a
  SET NODE_MINOR=%%b
  SET NODE_PATCH=%%c
)

:: Remove 'v' prefix from version
SET NODE_MAJOR=%NODE_MAJOR:~1%

ECHO Detected Node.js version: v%NODE_MAJOR%.%NODE_MINOR%.%NODE_PATCH%

IF %NODE_MAJOR% GEQ 22 (
  ECHO Using Node.js v22 compatibility mode...
  SET NODE_OPTIONS=--openssl-legacy-provider
  npm run start:legacy
) ELSE IF %NODE_MAJOR% GEQ 16 (
  ECHO Using standard development mode...
  npm start
) ELSE (
  ECHO WARNING: Using Node.js version below v16. We recommend updating to at least Node.js v16.
  ECHO Attempting to start with fallback mode...
  SET NODE_OPTIONS=--openssl-legacy-provider
  npm run start:legacy
)
