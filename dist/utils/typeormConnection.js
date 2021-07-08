"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToTypeorm = void 0;
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("../ormconfig"));
const connectToTypeorm = (app) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = typeorm_1.getConnection();
    }
    catch (e) {
        console.log(e);
    }
    try {
        if (connection) {
            if (!connection.isConnected) {
                yield connection.connect();
            }
        }
        else {
            yield typeorm_1.createConnection(ormconfig_1.default);
        }
        console.log('🌴 Successfully connected to PostgreSQL');
        app.listen(8080, () => {
            console.log(`Express is listening at http://localhost:${8080}`);
        });
    }
    catch (e) {
        console.error('ERROR: Database connection failed!!', e);
        throw e;
    }
});
exports.connectToTypeorm = connectToTypeorm;
//# sourceMappingURL=typeormConnection.js.map