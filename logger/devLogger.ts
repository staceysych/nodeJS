const { createLogger, format, transports } = require('winston');

const { combine, printf } = format;

export const devLogger = () => {
  const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

  return createLogger({
    level: 'debug',
    format: combine(format.colorize(), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [new transports.Console()],
  });
};
