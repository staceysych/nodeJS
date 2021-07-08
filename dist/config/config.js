"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.refreshSecret = exports.jwtSecret = exports.psqlDb = exports.psqlUser = exports.psqlPassword = exports.psqlPort = exports.psqlHost = exports.port = exports.dbString = exports.db = void 0;
require('dotenv').config();
exports.db = process.env.DB;
exports.dbString = process.env.DB_CONN_STRING;
exports.port = process.env.PORT || 3000;
exports.psqlHost = process.env.POSTGRES_HOST;
exports.psqlPort = process.env.POSTGRES_PORT;
exports.psqlPassword = process.env.POSTGRES_PASSWORD;
exports.psqlUser = process.env.POSTGRES_USER;
exports.psqlDb = process.env.POSTGRES_DB;
exports.jwtSecret = process.env.JWT_SECRET_KEY;
exports.refreshSecret = process.env.REFRESH_SECRET_KEY;
exports.jwtConfig = {
    jwtSecret: process.env.JWT_SECRET_KEY,
    refreshSecret: process.env.REFRESH_SECRET_KEY,
    tokens: {
        access: {
            type: 'access',
            expiresIn: '2m',
        },
        refresh: {
            type: 'refresh',
            expiresIn: '3m',
        },
    },
};
//# sourceMappingURL=config.js.map