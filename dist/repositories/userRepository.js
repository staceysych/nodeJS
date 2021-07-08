"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const IUserTypegooseRepository_1 = require("./typegooseRepositories/IUserTypegooseRepository");
const IUserTypeOrmRepository_1 = require("./typeormRepositories/IUserTypeOrmRepository");
const constants_1 = require("../utils/constants");
class UserRepository {
    create() {
        if (process.env.DB === constants_1.POSTGRES_DB) {
            return typeorm_1.getCustomRepository(IUserTypeOrmRepository_1.UserTypeOrmRepository);
        }
        return new IUserTypegooseRepository_1.UserTypegooseRepository();
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map