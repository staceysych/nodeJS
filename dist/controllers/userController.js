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
exports.updateUserPassword = exports.updateUserProfile = exports.getUsers = exports.signUp = exports.renewAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const services_1 = require("../services");
const constants_1 = require("../utils/constants");
const authHelpers_1 = require("../utils/authHelpers");
const passwordHelpers_1 = require("../utils/passwordHelpers");
const utils_1 = require("../utils");
const logger = require('../logger');
const renewAccessToken = (req, res, next) => {
    const { refreshSecret } = config_1.jwtConfig;
    const { refreshToken } = req.body;
    if (!refreshToken || !authHelpers_1.refreshTokens.includes(refreshToken)) {
        next(utils_1.ApiError.forbidden(constants_1.USER_IS_NOT_AUTHORIZED));
    }
    else {
        jsonwebtoken_1.default.verify(refreshToken, refreshSecret, (err, user) => {
            if (err) {
                next(utils_1.ApiError.forbidden(constants_1.USER_IS_NOT_AUTHORIZED));
            }
            else {
                const { username, role } = user;
                const accessToken = authHelpers_1.generateAccessToken(username, role);
                const refresh = authHelpers_1.generateRefreshToken(role);
                return res.status(201).json({ accessToken, refreshToken: refresh.token });
            }
        });
    }
};
exports.renewAccessToken = renewAccessToken;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, firstName, lastName, role } = req.body;
        if (!constants_1.USERNAME_REGEX.test(username) || !constants_1.PASSWORD_REGEX.test(password)) {
            next(utils_1.ApiError.badRequest(constants_1.INVALID_USER_DATA));
            return;
        }
        const user = yield services_1.UserService.getOneUser(username);
        const isUser = process.env.DB === constants_1.POSTGRES_DB ? user.length : user;
        if (!isUser) {
            yield services_1.UserService.register(username, password, role, firstName, lastName);
            const newUser = yield services_1.UserService.getOneUser(username);
            const token = authHelpers_1.generateAccessToken(username, role);
            const refreshToken = authHelpers_1.generateRefreshToken(role).token;
            const userToReturn = { token, refreshToken };
            res.status(200).json(userToReturn);
            const convertedUser = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(newUser) : newUser;
            logger.debug(convertedUser);
        }
        else {
            next(utils_1.ApiError.forbidden(constants_1.USER_ALREADY_EXISTS));
            return;
        }
    }
    catch (e) {
        next(e);
    }
});
exports.signUp = signUp;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.UserService.getAllUsers();
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getUsers = getUsers;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        yield services_1.UserService.updateProfile(username, req.body);
        const updatedProfile = yield services_1.UserService.getOneUser(username);
        if (!updatedProfile) {
            next(utils_1.ApiError.notFound(constants_1.USER_DOES_NOT_EXIST));
            return;
        }
        res.status(200).json(updatedProfile);
    }
    catch (e) {
        next(e);
    }
});
exports.updateUserProfile = updateUserProfile;
const updateUserPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, newPassword } = req.body;
        const user = yield services_1.UserService.getOneUser(username);
        if (!user) {
            next(utils_1.ApiError.notFound(constants_1.USER_DOES_NOT_EXIST));
            return;
        }
        const isPasswordMatched = yield passwordHelpers_1.comparePasswords(password, user);
        if (!isPasswordMatched) {
            next(utils_1.ApiError.badRequest(constants_1.PASSWORDS_DO_NOT_MATCH));
            return;
        }
        yield services_1.UserService.updatePassword(username, newPassword);
        const updatedProfile = yield services_1.UserService.getOneUser(username);
        res.status(200).json(updatedProfile);
    }
    catch (e) {
        next(e);
    }
});
exports.updateUserPassword = updateUserPassword;
//# sourceMappingURL=userController.js.map