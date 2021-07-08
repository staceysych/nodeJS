"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typegooseConnection_1 = require("./utils/typegooseConnection");
const typeormConnection_1 = require("./utils/typeormConnection");
const constants_1 = require("./utils/constants");
const app = require('./routes');
if (process.env.DB === constants_1.POSTGRES_DB) {
    typeormConnection_1.connectToTypeorm(app);
}
else {
    typegooseConnection_1.connectToMongo(app);
}
//# sourceMappingURL=server.js.map