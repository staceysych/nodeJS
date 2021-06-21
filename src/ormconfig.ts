import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { psqlPassword } from './config/config';

const isCompiled = path.extname(__filename).includes('js');

export default {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: psqlPassword,
  database: 'nodeJs',
  synchronize: true,
  logging: false,
  autoReconnect: true,
  entities: [`src/db/schemas/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [],
} as ConnectionOptions;
