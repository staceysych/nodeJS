import {Connection, createConnection, getConnection} from "typeorm";
import ORMConfig from "../ormconfig";

export const connectToTypeorm = async (app) => {
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
      console.log("🌴 Successfully connected to PostgreSQL");
      app.listen(3000, () => {
          console.log(`Express is listening at http://localhost:${3000}`)
      });
    } catch (e) {
      console.error('ERROR: Database connection failed!!', e);
      throw e;
    }
  };