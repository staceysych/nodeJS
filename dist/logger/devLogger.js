"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLogger = void 0;
const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;
const devLogger = () => {
    const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);
    return createLogger({
        level: 'debug',
        format: combine(format.colorize(), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
        transports: [new transports.Console()],
    });
};
exports.devLogger = devLogger;
//# sourceMappingURL=devLogger.js.map