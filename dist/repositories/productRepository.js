"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const typeorm_1 = require("typeorm");
const IProductTypeOrmRepository_1 = require("./typeormRepositories/IProductTypeOrmRepository");
const IProductTypegooseRepository_1 = require("./typegooseRepositories/IProductTypegooseRepository");
const constants_1 = require("../utils/constants");
class ProductRepository {
    create() {
        if (process.env.DB === constants_1.POSTGRES_DB) {
            return typeorm_1.getCustomRepository(IProductTypeOrmRepository_1.ProductTypeOrmRepository);
        }
        return new IProductTypegooseRepository_1.ProductTypegooseRepository();
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=productRepository.js.map