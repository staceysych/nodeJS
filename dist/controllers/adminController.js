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
exports.deleteCategory = exports.updateCategoryById = exports.createNewCategory = exports.getCategory = exports.deleteProduct = exports.updateProduct = exports.createNewProduct = exports.getProduct = void 0;
const services_1 = require("../services");
const constants_1 = require("../utils/constants");
const logger = require('../logger');
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield services_1.AdminService.getProductById(id);
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getProduct = getProduct;
const createNewProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.AdminService.addProduct(req.body);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        res.status(200).json(data);
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.createNewProduct = createNewProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield services_1.AdminService.updateProduct(id, req.body);
        const updatedProduct = yield services_1.AdminService.getProductById(id);
        res.status(200).json(updatedProduct);
    }
    catch (e) {
        next(e);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield services_1.AdminService.deleteProductById(id);
        res.status(200).send(constants_1.PRODUCT_WAS_DELETED);
    }
    catch (e) {
        next(e);
    }
});
exports.deleteProduct = deleteProduct;
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield services_1.AdminService.getCategoryById(id);
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getCategory = getCategory;
const createNewCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.AdminService.addCategory(req.body);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        res.status(200).json(data);
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.createNewCategory = createNewCategory;
const updateCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield services_1.AdminService.updateCategory(id, req.body);
        const updatedProduct = yield services_1.AdminService.getCategoryById(id);
        res.status(200).json(updatedProduct);
    }
    catch (e) {
        next(e);
    }
});
exports.updateCategoryById = updateCategoryById;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield services_1.AdminService.deleteCategoryById(id);
        res.status(200).send(constants_1.CATEGORY_WAS_DELETED);
    }
    catch (e) {
        next(e);
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=adminController.js.map