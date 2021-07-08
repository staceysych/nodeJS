"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodLogger = void 0;
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, json } = format;
const prodLogger = () => createLogger({
    format: combine(timestamp(), json()),
    transports: [new transports.Console()],
});
exports.prodLogger = prodLogger;
//# sourceMappingURL=prodLogger.js.map