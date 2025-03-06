// Polyfills and configuration for Node.js v22 compatibility
console.log('Loading polyfills for Node.js v22 compatibility...');

// Patch for browser mode (making sure Node.js modules don't break the app)
if (typeof window !== 'undefined') {
  // Create mock objects for Node.js modules that might be imported
  window.process = window.process || {
    env: {},
    nextTick: (fn) => setTimeout(fn, 0),
    browser: true,
    version: 'v22.0.0'
  };

  // Create a mock for fs operations
  window.fs = window.fs || {
    promises: {
      readFile: async (path, options) => {
        console.log(`Simulated reading file: ${path}`);
        return new TextEncoder().encode('Simulated file content');
      },
      writeFile: async (path, data, options) => {
        console.log(`Simulated writing to file: ${path}`);
        return true;
      }
    },
    readFile: (path, options, callback) => {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      setTimeout(() => {
        callback(null, new TextEncoder().encode('Simulated file content'));
      }, 0);
    },
    writeFile: (path, data, options, callback) => {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      setTimeout(() => {
        callback(null);
      }, 0);
    }
  };

  // Create a minimal mock for net module
  window.net = window.net || {
    Socket: function() {
      return {
        connect: () => {},
        on: () => {},
        write: () => {},
        end: () => {}
      };
    },
    createServer: () => {}
  };

  // Create a minimal mock for http module
  window.http = window.http || {
    createServer: () => {},
    request: () => {}
  };

  // Create a minimal mock for https module
  window.https = window.https || {
    createServer: () => {},
    request: () => {}
  };

  // Mock crypto for basic operations
  window.crypto = window.crypto || {
    getRandomValues: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    }
  };
}

// Now import the real entry point
import './index.js';
