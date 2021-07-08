"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserRatingsTypeOrmRepository = void 0;
const typeorm_1 = require("typeorm");
const UserRatingsTypeOrmSchema_1 = require("../../db/schemas/typeormSchemas/UserRatingsTypeOrmSchema");
let UserRatingsTypeOrmRepository = class UserRatingsTypeOrmRepository extends typeorm_1.Repository {
    rate(ratingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.find({ username: ratingData.username });
            const index = users.findIndex((user) => user.productId === +ratingData.productId);
            const data = {
                username: ratingData.username,
                productId: +ratingData.productId,
                rating: +ratingData.rating,
                comment: ratingData.comment,
            };
            if (index === -1) {
                const newRating = yield this.createQueryBuilder('user_ratings')
                    .insert()
                    .into(UserRatingsTypeOrmSchema_1.UserRatings)
                    .values(data)
                    .returning('id')
                    .execute();
                const ratingToRes = yield this.findOne({ id: newRating.raw[0].id });
                const allRatingsById = yield this.find({ productId: ratingData.productId });
                return {
                    ratingToRes,
                    allRatingsById,
                };
            }
            data.rating = ratingData.rating || +users[index].rating;
            data.comment = ratingData.comment || users[index].comment;
            const updatedRating = yield this.createQueryBuilder('user_ratings')
                .update()
                .set(data)
                .where({ username: data.username, productId: data.productId })
                .returning('id')
                .execute();
            const ratingToRes = yield this.findOne({ id: updatedRating.raw[0].id });
            const allRatingsById = yield this.find({ productId: ratingData.productId });
            return {
                ratingToRes,
                allRatingsById,
            };
        });
    }
    get10LastRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            const conditions = {
                order: { created_at: 'DESC' },
                take: 10,
            };
            return this.find(conditions);
        });
    }
    deleteRatings(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('user_ratings')
                .delete()
                .from(UserRatingsTypeOrmSchema_1.UserRatings)
                .where({ created_at: typeorm_1.LessThanOrEqual(date) })
                .execute();
        });
    }
};
UserRatingsTypeOrmRepository = __decorate([
    typeorm_1.EntityRepository(UserRatingsTypeOrmSchema_1.UserRatings)
], UserRatingsTypeOrmRepository);
exports.UserRatingsTypeOrmRepository = UserRatingsTypeOrmRepository;
//# sourceMappingURL=IUserRatingsTypeOrmRepository.js.map