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

  getServer() {
    return this.request('/server');
  }

  getServerPlayers() {
    return this.request('/server/players');
  }

  getServerJoinLogs() {
    return this.request('/server/joinlogs');
  }

  getServerQueue() {
    return this.request('/server/queue');
  }

  getServerKillLogs() {
    return this.request('/server/killlogs');
  }

  getServerCommandLogs() {
    return this.request('/server/commandlogs');
  }

  getServerModCalls() {
    return this.request('/server/modcalls');
  }

  getServerBans() {
    return this.request('/server/bans');
  }

  getServerVehicles() {
    return this.request('/server/vehicles');
  }

  executeCommand(command) {
    if (!command) {
      throw new Error('Command is required.');
    }
    return this.request('/server/command', 'POST', { "command": command });
  }
}

module.exports = PRCApi;

