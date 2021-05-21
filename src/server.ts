require('dotenv').config();

import {Connection, createConnection, getConnection} from "typeorm";
import ORMConfig from "./ormconfig";

import { dbString, port } from './config/config';

/* const mongoose = require('mongoose'); */
const app = require('./routes');

/* const startServer = async () => {
    try {
        await mongoose.connect(dbString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to DB');
        app.listen(port, () => {
            console.log(`Express is listening at http://localhost:${port}`)
        });
    } catch(e) {
        console.log(e);
    }
}

startServer(); */

const DBConnect = async () => {
  let connection: Connection | undefined;
  try {
    connection = getConnection();
  } catch (e) {
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(ORMConfig);
    }
    console.log("🌴 Database connection was successful!");
    app.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`)
    });
  } catch (e) {
    console.error('ERROR: Database connection failed!!', e);
    throw e;
  }
};

DBConnect();