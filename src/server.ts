import { connectToMongo } from '../src/utils/typegooseConnection';
import { connectToTypeorm } from '../src/utils/typeormConnection';

const app = require('./routes');

if (process.env.DB === 'pg') {
  connectToTypeorm(app);
} else {
  connectToMongo(app);
}

