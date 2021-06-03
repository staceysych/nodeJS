const { format, createLogger, transports } = require('winston');
const { timestamp, combine, json } = format;

export const prodLogger = () => {
  return createLogger({
    format: combine(timestamp(), json()),
    transports: [new transports.Console()],
  });
}