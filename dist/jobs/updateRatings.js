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
exports.updateRatings = void 0;
const constants_1 = require("../utils/constants");
const RatingsService = require('../services/ratingsService');
const updateRatings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRatings = yield RatingsService.getLastRatings();
        const lastDate = process.env.DB === constants_1.POSTGRES_DB
            ? allRatings[allRatings.length - 1].created_at
            : allRatings[allRatings.length - 1].createdAt;
        yield RatingsService.deleteRatings(lastDate);
    }
    catch (e) {
        console.log(e);
    }
});
exports.updateRatings = updateRatings;
//# sourceMappingURL=updateRatings.js.map