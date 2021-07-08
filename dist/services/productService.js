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
exports.get10LastRatings = exports.rateProduct = exports.getByPrice = exports.getByRating = exports.getByDisplayName = exports.getProductById = exports.getAllProducts = void 0;
const utils_1 = require("../utils");
const productRepository_1 = require("../repositories/productRepository");
const getAllProducts = (limit = 0, skip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        const data = yield repository.getAll(limit, skip);
        return data;
    }
    catch (error) {
        utils_1.ApiError.badRequest(error);
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = yield new productRepository_1.ProductRepository().create();
        const data = yield repository.getById(id);
        return data;
    }
    catch (error) {
        utils_1.ApiError.badRequest(error);
    }
});
exports.getProductById = getProductById;
const getByDisplayName = (displayName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        const data = yield repository.getByName(displayName);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getByDisplayName = getByDisplayName;
const getByRating = (minRating, field, direction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        const data = yield repository.getByMinRating(minRating, field, direction);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getByRating = getByRating;
const getByPrice = (priceRange, field, direction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        const data = yield repository.getByMinMaxPrice(priceRange, field, direction);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getByPrice = getByPrice;
const rateProduct = (ratingData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = yield new productRepository_1.ProductRepository().create();
        const data = yield repository.rateProduct(ratingData);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.rateProduct = rateProduct;
const get10LastRatings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = yield new productRepository_1.ProductRepository().create();
        const data = yield repository.get10LastRatings();
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.get10LastRatings = get10LastRatings;
//# sourceMappingURL=productService.js.map