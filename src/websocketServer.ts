import { get10LastRatings } from './controllers/ratingsController';

const Websocket = require('ws');

const wsServer = new Websocket.Server({ port: 8082 });

wsServer.on('connection', (ws) => {
  console.log('CONNECTED');

  ws.on('message', async (message) => {
    get10LastRatings(wsServer, ws, message);
  });

  ws.on('close', () => {
    console.log('DISCONNECTED');
  });
});

module.exports = wsServer;
