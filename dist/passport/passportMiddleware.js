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
exports.login = void 0;
const utils_1 = require("../utils");
const authHelpers_1 = require("../utils/authHelpers");
const constants_1 = require("../utils/constants");
const passport = require('passport');
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return passport.authenticate('local', { session: false }, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            next(utils_1.ApiError.badRequest(constants_1.AUTH_ERROR));
            return;
        }
        if (!user) {
            next(utils_1.ApiError.unauthorized(constants_1.INCORRECT_CREDENTIALS));
            return;
        }
        const { username, role } = process.env.DB === constants_1.POSTGRES_DB ? user[0] : user;
        const token = authHelpers_1.generateAccessToken(username, role);
        const refreshToken = authHelpers_1.generateRefreshToken(role).token;
        const response = {
            status: 'Logged in',
            token,
            refreshToken,
        };
        res.status(200).json(response);
    }))(req, res, next);
});
exports.login = login;
//# sourceMappingURL=passportMiddleware.js.map