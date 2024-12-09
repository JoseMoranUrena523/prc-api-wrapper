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

  wrapAsync(fn) {
    return (...args) => {
      let result;
      fn(...args)
        .then((data) => {
          result = JSON.stringify(data);
        })
        .catch((err) => {
          throw err;
        });
      return result;
    };
  }

  getServer = this.wrapAsync(async () => {
    return await this.request('/server');
  });

  getServerPlayers = this.wrapAsync(async () => {
    return await this.request('/server/players');
  });

  getServerJoinLogs = this.wrapAsync(async () => {
    return await this.request('/server/joinlogs');
  });

  getServerQueue = this.wrapAsync(async () => {
    return await this.request('/server/queue');
  });

  getServerKillLogs = this.wrapAsync(async () => {
    return await this.request('/server/killlogs');
  });

  getServerCommandLogs = this.wrapAsync(async () => {
    return await this.request('/server/commandlogs');
  });

  getServerModCalls = this.wrapAsync(async () => {
    return await this.request('/server/modcalls');
  });

  getServerBans = this.wrapAsync(async () => {
    return await this.request('/server/bans');
  });

  getServerVehicles = this.wrapAsync(async () => {
    return await this.request('/server/vehicles');
  });

  executeCommand = this.wrapAsync(async (command) => {
    if (!command) {
      throw new Error('Command is required.');
    }
    return await this.request('/server/command', 'POST', { command });
  });
}

module.exports = PRCApi;
