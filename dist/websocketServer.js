"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ratingsController_1 = require("./controllers/ratingsController");
const Websocket = require('ws');
const wsServer = new Websocket.Server({ port: 8082 });
wsServer.on('connection', (ws) => {
    console.log('CONNECTED');
    ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        ratingsController_1.get10LastRatings(wsServer, ws, message);
    }));
    ws.on('close', () => {
        console.log('DISCONNECTED');
    });
});
module.exports = wsServer;
//# sourceMappingURL=websocketServer.js.map