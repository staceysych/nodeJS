"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config_1 = require("./config/config");
const isCompiled = path_1.default.extname(__filename).includes('js');
exports.default = {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: config_1.psqlPassword,
    database: 'nodeJs',
    synchronize: true,
    logging: false,
    autoReconnect: true,
    entities: [`src/db/schemas/**/*.${isCompiled ? 'js' : 'ts'}`],
    migrations: [],
};
//# sourceMappingURL=ormconfig.js.map