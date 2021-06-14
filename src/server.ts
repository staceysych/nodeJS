import { connectToMongo } from './utils/typegooseConnection';
import { connectToTypeorm } from './utils/typeormConnection';

const app = require('./routes');

if (process.env.DB === 'pg') {
  connectToTypeorm(app);
} else {
  connectToMongo(app);
}
