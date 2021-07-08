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
exports.ProductTypeOrmRepository = void 0;
const typeorm_1 = require("typeorm");
const ProductTypeOrmSchema_1 = require("../../db/schemas/typeormSchemas/ProductTypeOrmSchema");
const constants_1 = require("../../utils/constants");
const utils_1 = require("../../utils");
const IUserRatingsTypeOrmRepository_1 = require("./IUserRatingsTypeOrmRepository");
let ProductTypeOrmRepository = class ProductTypeOrmRepository extends typeorm_1.Repository {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ id });
        });
    }
    getAll(limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ skip, take: limit });
        });
    }
    getByName(displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ display_name: displayName });
        });
    }
    getByMinRating(minRating, field, direction = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultField = 'id';
            const stringDirection = direction === 1 ? constants_1.SORT_DIRECTION[0] : constants_1.SORT_DIRECTION[1];
            return this.find({
                where: { total_rating: typeorm_1.MoreThanOrEqual(minRating) },
                order: { [field || defaultField]: stringDirection },
            });
        });
    }
    getByMinMaxPrice(priceParam, field, direction = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const [minPrice, maxPrice] = priceParam.split(':');
            const defaultField = 'id';
            const stringDirection = direction === 1 ? constants_1.SORT_DIRECTION[0] : constants_1.SORT_DIRECTION[1];
            return maxPrice
                ? this.find({
                    where: { price: typeorm_1.Between(minPrice || 0, maxPrice) },
                    order: { [field || defaultField]: stringDirection },
                })
                : this.find({
                    where: { price: typeorm_1.MoreThanOrEqual(minPrice) },
                    order: { [field || defaultField]: stringDirection },
                });
        });
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                display_name: productData.display_name,
                category_ids: yield utils_1.getCategoryIdByName(productData.category_ids),
                total_rating: 0,
                price: +productData.price,
            };
            const createdProduct = yield this.createQueryBuilder('product')
                .insert()
                .into(ProductTypeOrmSchema_1.Product)
                .values(data)
                .returning('id')
                .execute();
            return this.findOne({ id: createdProduct.raw[0].id });
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload.category_ids && payload.category_ids.length) {
                // eslint-disable-next-line no-param-reassign
                payload.category_ids = yield utils_1.getCategoryIdByName(payload.category_ids);
            }
            return this.createQueryBuilder('product').update().set(payload).where({ id }).execute();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('product').delete().from(ProductTypeOrmSchema_1.Product).where({ id }).execute();
        });
    }
    rateProduct(ratingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield typeorm_1.getCustomRepository(IUserRatingsTypeOrmRepository_1.UserRatingsTypeOrmRepository);
            const data = yield repository.rate(ratingData);
            const { allRatingsById } = data;
            const totalRating = utils_1.countTotalRating(allRatingsById);
            yield this.update(allRatingsById[0].productId, { total_rating: totalRating });
            return data;
        });
    }
    get10LastRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            //
        });
    }
};
ProductTypeOrmRepository = __decorate([
    typeorm_1.EntityRepository(ProductTypeOrmSchema_1.Product)
], ProductTypeOrmRepository);
exports.ProductTypeOrmRepository = ProductTypeOrmRepository;
//# sourceMappingURL=IProductTypeOrmRepository.js.map