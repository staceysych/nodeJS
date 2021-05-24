import {ConnectionOptions} from "typeorm";
import path from "path";

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "nodeJs",
  synchronize: true,
  logging: false,
  autoReconnect: true,
  entities: [
    `src/db/schemas/**/*.${isCompiled ? "js" : "ts"}`
  ],
  migrations: [],
} as ConnectionOptions;