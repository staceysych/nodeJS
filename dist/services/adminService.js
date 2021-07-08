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
exports.deleteCategoryById = exports.updateCategory = exports.addCategory = exports.getCategoryById = exports.deleteProductById = exports.updateProduct = exports.addProduct = exports.getProductById = void 0;
const utils_1 = require("../utils");
const productRepository_1 = require("../repositories/productRepository");
const categoryRepository_1 = require("../repositories/categoryRepository");
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        const data = yield repository.getById(id);
        return data;
    }
    catch (error) {
        utils_1.ApiError.badRequest(error);
    }
});
exports.getProductById = getProductById;
const addProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        return repository.createProduct(productData);
    }
    catch (error) {
        utils_1.ApiError.badRequest(error);
    }
});
exports.addProduct = addProduct;
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        return repository.update(id, payload);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new productRepository_1.ProductRepository().create();
        return repository.delete(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProductById = deleteProductById;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        const data = yield repository.getById(id);
        return data;
    }
    catch (error) {
        utils_1.ApiError.badRequest(error);
    }
});
exports.getCategoryById = getCategoryById;
const addCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        return yield repository.createCategory(payload);
    }
    catch (error) {
        utils_1.ApiError.badRequest(error);
    }
});
exports.addCategory = addCategory;
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        return repository.update(id, payload);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        return repository.delete(id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteCategoryById = deleteCategoryById;
//# sourceMappingURL=adminService.js.map