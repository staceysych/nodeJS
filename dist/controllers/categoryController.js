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
exports.getCategoryById = exports.getAllCategories = void 0;
const services_1 = require("../services");
const constants_1 = require("../utils/constants");
const logger = require('../logger');
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.CategoryService.getAllCategories();
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        const { id } = req.params;
        data = yield services_1.CategoryService.getCategoryById(id);
        if (req.query.includeProducts || req.query.includeTop3Products) {
            const includeProducts = req.query.includeProducts && JSON.parse(req.query.includeProducts);
            const includeTop3Products = req.query.includeTop3Products && JSON.parse(req.query.includeTop3Products);
            data = yield services_1.CategoryService.getCategoryByIdWithProducts(id, includeProducts, includeTop3Products);
        }
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=categoryController.js.map