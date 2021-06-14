const { createLogger, format, transports } = require('winston');

const { combine, printf, timestamp } = format;

export const devLogger = () => {
  const logFormat = printf(({ level, message }) => `${timestamp} ${level}: ${message}`);

  return createLogger({
    level: 'debug',
    format: combine(format.colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [new transports.Console()],
  });
};
