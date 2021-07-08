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
exports.getCategoryByIdWithProducts = exports.getCategoryByName = exports.getCategoryById = exports.getAllCategories = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        const data = yield repository.getAll();
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        const data = yield repository.getById(id);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCategoryById = getCategoryById;
const getCategoryByName = (displayName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        const data = yield repository.getByName(displayName);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCategoryByName = getCategoryByName;
const getCategoryByIdWithProducts = (id, includeProducts, includeTop3Products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new categoryRepository_1.CategoryRepository().create();
        const data = yield repository.getByIdWithProducts(id, includeProducts, includeTop3Products);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCategoryByIdWithProducts = getCategoryByIdWithProducts;
//# sourceMappingURL=categoryService.js.map