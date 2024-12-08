# PRC API Wrapper

A simple and lightweight Node.js wrapper for interacting with the Police Roleplay Community (PRC) API.

## Features

- Supports all endpoints.
- Automatically handles required headers (`Server-Key` and optional `Authorization`).
- Built using `axios` for reliability and performance.
- Simple and clear API interface.

## Installation

```bash
npm install prc-api-wrapper
```

## Usage

### Import and Initialize

Create an instance of the `PRCApi` class with your `Server-Key` and (optionally) your `globalApiKey`:

```javascript
const PRCApi = require('prc-api-wrapper');

const prc = new PRCApi('your-server-key', 'your-global-api-key');
```

### Example: Fetch Server Information

```javascript
(async () => {
  try {
    const serverInfo = await prc.getServer();
    console.log('Server Info:', serverInfo);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

### Example: Execute a Command

```javascript
(async () => {
  try {
    const response = await prc.executeCommand(':h Testing the PRC API wrapper!');
    console.log('Command Response:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

## Supported Endpoints

### GET Requests

| Method               | Description                  |
|----------------------|------------------------------|
| `getServer()`        | Fetch server information.    |
| `getServerPlayers()` | Fetch server players.        |
| `getServerJoinLogs()`| Fetch server join logs.      |
| `getServerQueue()`   | Fetch server queue.          |
| `getServerKillLogs()`| Fetch server kill logs.      |
| `getServerCommandLogs()`| Fetch server command logs.|
| `getServerModCalls()`| Fetch server mod calls.      |
| `getServerBans()`    | Fetch server bans.           |
| `getServerVehicles()`| Fetch server vehicles.       |

### POST Requests

| Method                | Description                  |
|-----------------------|------------------------------|
| `executeCommand(command)` | Execute a server command (e.g., `:m Hello`). |

## Error Handling

The wrapper will throw descriptive errors if a request fails. For example:

```javascript
try {
  const result = await prc.getServer();
} catch (error) {
  console.error('API Error:', error.message);
}
```

## Requirements

- Node.js version 12 or higher.
- `axios` library.

## License

This project is licensed under the GPL License. Feel free to use, modify, and distribute it as needed.
(credits to [ChatGPT](https://chatgpt.com/) for helping me make this API wrapper)
