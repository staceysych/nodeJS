import { dbString } from '../config/config';

const mongoose = require('mongoose');
require('../websocketServer');

export const connectToMongo = async (app) => {
  console.log(dbString);
  try {
    await mongoose.connect(dbString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Express is listening`);
    });
  } catch (e) {
    console.log('ERROR: Database connection failed!!', e);
  }
};
