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
exports.updatePassword = exports.updateProfile = exports.register = exports.getAllUsers = exports.getOneUser = void 0;
const utils_1 = require("../utils");
const userRepository_1 = require("../repositories/userRepository");
const getOneUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new userRepository_1.UserRepository().create();
        return repository.getOne(username);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOneUser = getOneUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new userRepository_1.UserRepository().create();
        return repository.getAll();
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllUsers = getAllUsers;
const register = (username, password, role, firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new userRepository_1.UserRepository().create();
        return repository.createUser(username, password, role, firstName, lastName);
    }
    catch (error) {
        utils_1.ApiError.conflict(error);
    }
});
exports.register = register;
const updateProfile = (username, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new userRepository_1.UserRepository().create();
        return repository.update(username, userData);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProfile = updateProfile;
const updatePassword = (username, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new userRepository_1.UserRepository().create();
        return repository.updatePassword(username, newPassword);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=userService.js.map