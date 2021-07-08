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
const passport_local_1 = require("passport-local");
const passwordHelpers_1 = require("../utils/passwordHelpers");
const services_1 = require("../services");
const constants_1 = require("../utils/constants");
const initialize = (passport) => {
    const authenticateUser = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield services_1.UserService.getOneUser(username);
        const isUser = process.env.DB === constants_1.POSTGRES_DB ? user.length : user;
        if (!isUser) {
            return done(null, false);
        }
        try {
            const isPasswordMatched = yield passwordHelpers_1.comparePasswords(password, user);
            if (isPasswordMatched) {
                return done(null, user);
            }
            return done(null, false);
        }
        catch (e) {
            return done(e);
        }
    });
    passport.use(new passport_local_1.Strategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
};
module.exports = initialize;
//# sourceMappingURL=passport.js.map