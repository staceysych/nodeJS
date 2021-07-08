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
exports.deleteRatings = exports.getLastRatings = exports.addRating = void 0;
const ratingsRepository_1 = require("../repositories/ratingsRepository");
const addRating = (ratingData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new ratingsRepository_1.RatingsRepository().create();
        return repository.rate(ratingData);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addRating = addRating;
const getLastRatings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new ratingsRepository_1.RatingsRepository().create();
        return repository.get10LastRatings();
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLastRatings = getLastRatings;
const deleteRatings = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repository = new ratingsRepository_1.RatingsRepository().create();
        return repository.deleteRatings(date);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteRatings = deleteRatings;
//# sourceMappingURL=ratingsService.js.map