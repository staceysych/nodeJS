"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBuyer = exports.isAdmin = exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = exports.refreshTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const config_1 = require("../config/config");
const apiError_1 = require("./apiError");
const constants_1 = require("./constants");
const { tokens, jwtSecret, refreshSecret } = config_1.jwtConfig;
exports.refreshTokens = [];
const generateAccessToken = (username, role) => {
    const payload = {
        username,
        type: tokens.access.type,
        role: role || constants_1.ROLES.buyer,
    };
    const options = { expiresIn: tokens.access.expiresIn };
    return jsonwebtoken_1.default.sign(payload, jwtSecret, options);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (role) => {
    const payload = {
        id: uuid_1.v4(),
        type: tokens.refresh.type,
        role,
    };
    const options = { expiresIn: tokens.refresh.expiresIn };
    const token = jsonwebtoken_1.default.sign(payload, refreshSecret, options);
    exports.refreshTokens.push(token);
    return {
        id: payload.id,
        token,
    };
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, user) => {
            if (err) {
                next(apiError_1.ApiError.forbidden(constants_1.USER_IS_NOT_AUTHORIZED));
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        next(apiError_1.ApiError.forbidden(constants_1.USER_IS_NOT_AUTHORIZED));
    }
};
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => {
    if (req.user.role === constants_1.ROLES.admin) {
        next();
    }
    else {
        next(apiError_1.ApiError.forbidden(constants_1.ONLY_ADMIN));
    }
};
exports.isAdmin = isAdmin;
const isBuyer = (req, res, next) => {
    if (req.user.role === constants_1.ROLES.buyer) {
        next();
    }
    else {
        next(apiError_1.ApiError.forbidden(constants_1.ONLY_BUYER));
    }
};
exports.isBuyer = isBuyer;
//# sourceMappingURL=authHelpers.js.map