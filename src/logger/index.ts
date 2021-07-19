import { devLogger } from './devLogger';
import { prodLogger } from './prodLogger';

let logger = null;
if (process.env.NODE_ENV === 'development') {
  logger = devLogger();
} else {
  logger = prodLogger();
}

module.exports = logger;
