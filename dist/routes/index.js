"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const productController_1 = require("../controllers/productController");
const errorHandler_1 = require("../utils/errorHandler");
const updateRatings_1 = require("../jobs/updateRatings");
const constants_1 = require("../utils/constants");
const swaggerDocument = __importStar(require("../swagger/swagger.json"));
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cron = require('node-cron');
const products = require('./products');
const categories = require('./categories');
const users = require('./users');
const logger = require('../logger');
const initializePassport = require('../passport/passport');
const app = express();
initializePassport(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, done) => {
    logger.info(`Request: ${req.originalUrl} - ${req.method}. Response: status code - ${res.statusCode}`);
    done();
});
app.get('/', (req, res) => {
    res.send(`Hello, ${process.env.USERNAME}! My name is Anastasiya Sych. It's my first server`);
});
app.get('/lastRatings', productController_1.get10LastRatings);
app.use('/products', products);
app.use('/categories', categories);
app.use('/users', users);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((req, res) => {
    logger.error(`status: 404, message: Nothing was found for this request ${req.originalUrl}`);
    res.status(404).send({
        error: {
            status: 404,
            message: 'Nothing was found',
        },
    });
});
app.use(errorHandler_1.errorHandler);
cron.schedule(constants_1.EVERY_MONDAY_CRON, () => __awaiter(void 0, void 0, void 0, function* () {
    updateRatings_1.updateRatings();
}));
module.exports = app;
//# sourceMappingURL=index.js.map