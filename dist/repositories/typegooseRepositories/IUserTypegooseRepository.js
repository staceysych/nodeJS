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
exports.UserTypegooseRepository = void 0;
const UserTypegooseSchema_1 = require("../../db/schemas/typegooseSchemas/UserTypegooseSchema");
const passwordHelpers_1 = require("../../utils/passwordHelpers");
const constants_1 = require("../../utils/constants");
class UserTypegooseRepository {
    constructor() {
        this.dataModel = UserTypegooseSchema_1.User;
    }
    getOne(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.findOne({ username });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.find({});
        });
    }
    createUser(username, password, role, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                username,
                password: yield passwordHelpers_1.hashPassword(password),
                firstName: firstName || '',
                lastName: lastName || '',
                role: role || constants_1.ROLES.buyer,
            };
            return new UserTypegooseSchema_1.User(data).save();
        });
    }
    update(username, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.findOneAndUpdate({ username }, payload);
        });
    }
    updatePassword(username, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.findOneAndUpdate({ username }, { password: yield passwordHelpers_1.hashPassword(newPassword) });
        });
    }
}
exports.UserTypegooseRepository = UserTypegooseRepository;
//# sourceMappingURL=IUserTypegooseRepository.js.map