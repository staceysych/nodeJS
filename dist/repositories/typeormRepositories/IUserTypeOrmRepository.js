"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeOrmRepository = void 0;
const typeorm_1 = require("typeorm");
const passwordHelpers_1 = require("../../utils/passwordHelpers");
const constants_1 = require("../../utils/constants");
const UserTypeOrmSchema_1 = require("../../db/schemas/typeormSchemas/UserTypeOrmSchema");
let UserTypeOrmRepository = class UserTypeOrmRepository extends typeorm_1.Repository {
    getOne(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { username } });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({});
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
            return this.createQueryBuilder('users').insert().into(UserTypeOrmSchema_1.User).values(data).execute();
        });
    }
    update(username, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('users')
                .update()
                .set({ firstName: payload.firstName, lastName: payload.lastName })
                .where({ username })
                .execute();
        });
    }
    updatePassword(username, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('users')
                .update()
                .set({ password: yield passwordHelpers_1.hashPassword(newPassword) })
                .where({ username })
                .execute();
        });
    }
};
UserTypeOrmRepository = __decorate([
    typeorm_1.EntityRepository(UserTypeOrmSchema_1.User)
], UserTypeOrmRepository);
exports.UserTypeOrmRepository = UserTypeOrmRepository;
//# sourceMappingURL=IUserTypeOrmRepository.js.map