import {ConnectionOptions} from "typeorm";
import path from "path";

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: process.env.DB,
  host: "localhost",
  port: process.env.PORT || 5432,
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