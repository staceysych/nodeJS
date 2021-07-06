import { dbString } from '../config/config';

const mongoose = require('mongoose');
require('../websocketServer');

export const connectToMongo = async (app) => {
  try {
    await mongoose.connect(process.env.DB_CONN_STRING || dbString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
    app.listen(3000, () => {
      console.log(`Express is listening at http://localhost:${3000}`);
    });
  } catch (e) {
    console.log('ERROR: Database connection failed!!', e);
  }
};
