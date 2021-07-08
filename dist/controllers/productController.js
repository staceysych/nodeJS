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
exports.get10LastRatings = exports.rateProductById = exports.getByPrice = exports.getByMinRating = exports.getByDisplayName = exports.getAllProducts = void 0;
const getSortCriteria_1 = require("../utils/getSortCriteria");
const services_1 = require("../services");
const utils_1 = require("../utils");
const constants_1 = require("../utils/constants");
const logger = require('../logger');
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit, 10);
        const skip = parseInt(req.query.skip, 10);
        const data = yield services_1.ProductService.getAllProducts(limit, skip);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getAllProducts = getAllProducts;
const getByDisplayName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const displayName = req.query.displayName;
        const data = yield services_1.ProductService.getByDisplayName(displayName);
        if (!data.length) {
            next(utils_1.ApiError.notFound(`${constants_1.NOTHING_FOUND_BY_DISPLAY_NAME} - ${req.query.displayName}`));
            return;
        }
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getByDisplayName = getByDisplayName;
const getByMinRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        const rating = parseInt(req.query.minRating, 10);
        if (req.query.sortBy) {
            const { field, direction } = getSortCriteria_1.getSortCriteria(req);
            data = yield services_1.ProductService.getByRating(rating, field, direction);
        }
        else {
            data = yield services_1.ProductService.getByRating(rating);
        }
        if (!data) {
            next(utils_1.ApiError.badRequest(constants_1.MIN_RATING_ERROR));
            return;
        }
        if (!data.length) {
            next(utils_1.ApiError.notFound(`${constants_1.NOTHING_FOUND_BY_MIN_RATING} - ${req.query.minRating}`));
            return;
        }
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getByMinRating = getByMinRating;
const getByPrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        const price = req.query.price;
        if (req.query.sortBy) {
            const { field, direction } = getSortCriteria_1.getSortCriteria(req);
            data = yield services_1.ProductService.getByPrice(price, field, direction);
        }
        else {
            data = yield services_1.ProductService.getByPrice(price);
        }
        if (!data) {
            next(utils_1.ApiError.badRequest(constants_1.PRICE_ERROR));
            return;
        }
        if (!data.length) {
            next(utils_1.ApiError.notFound(`${constants_1.NOTHING_FOUND_BY_PRICE} - ${req.query.price}`));
            return;
        }
        res.status(200).json(data);
        const convertedData = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(data) : data;
        logger.debug(convertedData);
    }
    catch (e) {
        next(e);
    }
});
exports.getByPrice = getByPrice;
const rateProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratingData = {
            username: req.user.username,
            productId: req.params.id,
            rating: req.body.rating || 0,
            comment: req.body.comment || '',
            createdAt: utils_1.convertDateToTimestamp(),
        };
        if (!utils_1.validateRating(+ratingData.rating)) {
            next(utils_1.ApiError.badRequest(constants_1.INVALID_RATING));
            return;
        }
        yield services_1.RatingsService.addRating(ratingData);
        const result = yield services_1.ProductService.rateProduct(ratingData);
        const updatedProduct = process.env.DB === constants_1.POSTGRES_DB ? result.ratingToRes : yield services_1.ProductService.getProductById(req.params.id);
        const converted = process.env.DB === constants_1.POSTGRES_DB ? JSON.stringify(updatedProduct) : updatedProduct;
        res.status(200).json(updatedProduct);
        logger.debug(converted);
    }
    catch (e) {
        next(e);
    }
});
exports.rateProductById = rateProductById;
const get10LastRatings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = yield services_1.RatingsService.getLastRatings();
        res.status(200).json(ratings);
        logger.debug(JSON.stringify(ratings));
    }
    catch (e) {
        next(e);
    }
});
exports.get10LastRatings = get10LastRatings;
//# sourceMappingURL=productController.js.map