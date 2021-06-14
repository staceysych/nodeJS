import { connectToMongo } from './utils/typegooseConnection';
import { connectToTypeorm } from './utils/typeormConnection';
import { POSTGRES_DB } from './utils/constants';

const app = require('./routes');

if (process.env.DB === POSTGRES_DB) {
  connectToTypeorm(app);
} else {
  connectToMongo(app);
}
