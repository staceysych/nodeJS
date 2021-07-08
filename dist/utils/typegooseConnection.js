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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const config_1 = require("../config/config");
const mongoose = require('mongoose');
require('../websocketServer');
const connectToMongo = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(config_1.dbString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
        app.listen(3000, () => {
            console.log(`Express is listening`);
        });
    }
    catch (e) {
        console.log('ERROR: Database connection failed!!', e);
    }
});
exports.connectToMongo = connectToMongo;
//# sourceMappingURL=typegooseConnection.js.map