"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const typeorm_1 = require("typeorm");
const ICategoryTypegooseRepository_1 = require("./typegooseRepositories/ICategoryTypegooseRepository");
const ICategoryTypeOrmRepository_1 = require("./typeormRepositories/ICategoryTypeOrmRepository");
const constants_1 = require("../utils/constants");
class CategoryRepository {
    create() {
        if (process.env.DB === constants_1.POSTGRES_DB) {
            return typeorm_1.getCustomRepository(ICategoryTypeOrmRepository_1.CategoryTypeOrmRepository);
        }
        return new ICategoryTypegooseRepository_1.CategoryTypegooseRepository();
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=categoryRepository.js.map