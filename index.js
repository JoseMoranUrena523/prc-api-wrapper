const axios = require('axios');

class PRCApi {
  constructor(serverKey, globalApiKey = null) {
    if (!serverKey) {
      throw new Error('Server-Key is required.');
    }

    this.baseUrl = 'https://api.policeroleplay.community/v1';
    this.headers = {
      'Server-Key': serverKey,
      ...(globalApiKey && { Authorization: globalApiKey }),
    };
  }

  async request(endpoint, method = 'GET', data = null) {
    try {
      const response = await axios({
        url: `${this.baseUrl}${endpoint}`,
        method,
        headers: this.headers,
        ...(data && { data }),
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `${error.response.status} - ${error.response.data.message || 'Unknown error'}`
        );
      } else {
        throw new Error(`Request failed: ${error.message}`);
      }
    }
  }

  async getServer() {
    const data = await this.request('/server');
    return data;
  }
  
  async getServerPlayers() {
      const data = await this.request('/server/players');
      return data;
  }
  
  async getServerJoinLogs() {
      const data = await this.request('/server/joinlogs');
      return data;
  }
  
  async getServerQueue() {
      const data = await this.request('/server/queue');
      return data;
  }
  
  async getServerKillLogs() {
      const data = await this.request('/server/killlogs');
      return data;
  }
  
  async getServerCommandLogs() {
      const data = await this.request('/server/commandlogs');
      return data;
  }
  
  async getServerModCalls() {
      const data = await this.request('/server/modcalls');
      return data;
  }
  
  async getServerBans() {
      const data = await this.request('/server/bans');
      return data;
  }
  
  async getServerVehicles() {
      const data = await this.request('/server/vehicles');
      return data;
  }
  
  async executeCommand(command) {
      if (!command) {
          throw new Error('Command is required.');
      }
      const data = await this.request('/server/command', 'POST', { command });
      return data;
  }
}

module.exports = PRCApi;

