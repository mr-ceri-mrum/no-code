// Browser-compatible Telegram service
// This provides a simulation layer for Telegram bot functionality in the browser

class TelegramService {
  constructor() {
    this.connections = {};
  }

  /**
   * Simulates connecting to a Telegram bot
   * @param {string} token - Bot token
   * @returns {Promise<object>} - Bot info
   */
  async connect(token) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!token || token.length < 10) {
      throw new Error('Invalid token');
    }
    
    // Generate a simulated bot username from the token
    const username = `bot${token.substring(0, 6).toLowerCase()}`;
    
    // Store connection
    this.connections[token] = {
      username,
      connected: true,
      timestamp: Date.now()
    };
    
    return {
      username,
      first_name: 'Sample Bot',
      can_join_groups: true,
      can_read_all_group_messages: false,
      supports_inline_queries: false
    };
  }

  /**
   * Simulates setting up a webhook
   * @param {string} token - Bot token 
   * @param {string} url - Webhook URL
   * @returns {Promise<boolean>} - Success status
   */
  async setWebhook(token, url) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!this.connections[token]) {
      throw new Error('Bot not connected');
    }
    
    if (!url || !url.startsWith('https://')) {
      throw new Error('Webhook URL must start with https://');
    }
    
    return true;
  }

  /**
   * Simulates starting polling
   * @param {string} token - Bot token
   * @param {object} options - Polling options
   * @returns {Promise<boolean>} - Success status
   */
  async startPolling(token, options = {}) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!this.connections[token]) {
      throw new Error('Bot not connected');
    }
    
    return true;
  }
  
  /**
   * Gets bot info for a connected bot
   * @param {string} token - Bot token
   * @returns {object|null} - Bot info or null if not connected
   */
  getBotInfo(token) {
    return this.connections[token] || null;
  }
  
  /**
   * Lists all connected bots
   * @returns {array} - Array of connected bots
   */
  listConnections() {
    return Object.entries(this.connections).map(([token, info]) => ({
      token: `${token.substring(0, 5)}...`,
      ...info
    }));
  }
}

// Create singleton instance
const telegramService = new TelegramService();

export default telegramService;
