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
exports.ProductTypegooseRepository = void 0;
/* eslint-disable no-param-reassign */
const ProductTypegooseSchema_1 = require("../../db/schemas/typegooseSchemas/ProductTypegooseSchema");
const constants_1 = require("../../utils/constants");
const utils_1 = require("../../utils");
class ProductTypegooseRepository {
    constructor() {
        this.dataModel = ProductTypegooseSchema_1.Product;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.find({ _id: id });
        });
    }
    getAll(limit = 0, skip = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.find({}).skip(skip).limit(limit);
        });
    }
    getByName(displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.find({ displayName: new RegExp(displayName, 'i') });
        });
    }
    getByMinRating(minRating, field, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortField = field;
            const defaultField = 'displayName';
            const defaultDirection = 1;
            return this.dataModel
                .find({ totalRating: { $gte: minRating } })
                .sort({ [sortField || defaultField]: direction || defaultDirection });
        });
    }
    getByMinMaxPrice(priceParam, field, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortField = field;
            const defaultField = 'displayName';
            const defaultDirection = 1;
            const [minPrice, maxPrice] = priceParam.split(':');
            return maxPrice
                ? this.dataModel
                    .find({ price: { $gte: minPrice || 0, $lte: maxPrice } })
                    .sort({ [sortField || defaultField]: direction || defaultDirection })
                : this.dataModel
                    .find({ price: { $gte: minPrice } })
                    .sort({ [sortField || defaultField]: direction || defaultDirection });
        });
    }
    sortByFieldAndDirection(data, field, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = direction === constants_1.SORT_DIRECTION[0].toLocaleLowerCase() ? 1 : -1;
            return data.find({ $orderby: { [field]: dir } });
        });
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                displayName: productData.displayName,
                categoryIds: yield utils_1.getCategoryIdByName(productData.categoryIds),
                createdAt: utils_1.convertDateToTimestamp(),
                price: productData.price,
            };
            return new ProductTypegooseSchema_1.Product(data).save();
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload.categoryIds && payload.categoryIds.length) {
                // eslint-disable-next-line no-param-reassign
                payload.categoryIds = yield utils_1.getCategoryIdByName(payload.categoryIds);
            }
            return this.dataModel.findOneAndUpdate({ _id: id }, payload);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.deleteOne({ _id: id });
        });
    }
    rateProduct(ratingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.dataModel.findOne({ _id: ratingData.productId });
            const index = product.ratings.findIndex((user) => user.username === ratingData.username);
            if (index !== -1) {
                // eslint-disable-next-line no-param-reassign
                ratingData.rating = ratingData.rating || product.ratings[index].rating;
                ratingData.comment = ratingData.comment || product.ratings[index].comment;
                product.ratings[index] = ratingData;
                product.totalRating = utils_1.countTotalRating(product.ratings);
                return this.dataModel.updateOne({ _id: ratingData.productId }, { ratings: product.ratings, totalRating: product.totalRating });
            }
            product.ratings.push(ratingData);
            product.totalRating = utils_1.countTotalRating(product.ratings);
            return this.dataModel.updateOne({ _id: ratingData.productId }, { ratings: product.ratings, totalRating: product.totalRating });
        });
    }
    get10LastRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield this.getAll();
            const allRatings = allProducts.reduce((acc, cur) => {
                acc.push(...cur.ratings);
                return acc;
            }, []);
            allRatings.sort((a, b) => b.createdAt - a.createdAt);
            return allRatings.slice(0, 10);
        });
    }
}
exports.ProductTypegooseRepository = ProductTypegooseRepository;
//# sourceMappingURL=IProductTypegooseRepository.js.map