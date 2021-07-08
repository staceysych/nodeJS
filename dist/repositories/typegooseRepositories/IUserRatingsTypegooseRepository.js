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
exports.UserRatingsTypegooseRepository = void 0;
/* eslint-disable no-param-reassign */
const UserRatingsTypegooseSchema_1 = require("../../db/schemas/typegooseSchemas/UserRatingsTypegooseSchema");
class UserRatingsTypegooseRepository {
    constructor() {
        this.dataModel = UserRatingsTypegooseSchema_1.UserRatings;
    }
    rate(ratingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.dataModel.find({ username: ratingData.username });
            const index = users.findIndex((user) => user.productId === ratingData.productId);
            if (index === -1) {
                return new UserRatingsTypegooseSchema_1.UserRatings(ratingData).save();
            }
            ratingData.rating = ratingData.rating || +users[index].rating;
            ratingData.comment = ratingData.comment || users[index].comment;
            return this.dataModel.findOneAndUpdate({ username: ratingData.username, productId: ratingData.productId }, ratingData);
        });
    }
    get10LastRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.find({}).sort({ createdAt: -1 }).limit(10);
        });
    }
    deleteRatings(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.deleteMany({ createdAt: { $lt: date } });
        });
    }
}
exports.UserRatingsTypegooseRepository = UserRatingsTypegooseRepository;
//# sourceMappingURL=IUserRatingsTypegooseRepository.js.map