"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsRepository = void 0;
const typeorm_1 = require("typeorm");
const IUserRatingsTypegooseRepository_1 = require("./typegooseRepositories/IUserRatingsTypegooseRepository");
const IUserRatingsTypeOrmRepository_1 = require("./typeormRepositories/IUserRatingsTypeOrmRepository");
const constants_1 = require("../utils/constants");
class RatingsRepository {
    create() {
        if (process.env.DB === constants_1.POSTGRES_DB) {
            return typeorm_1.getCustomRepository(IUserRatingsTypeOrmRepository_1.UserRatingsTypeOrmRepository);
        }
        return new IUserRatingsTypegooseRepository_1.UserRatingsTypegooseRepository();
    }
}
exports.RatingsRepository = RatingsRepository;
//# sourceMappingURL=ratingsRepository.js.map