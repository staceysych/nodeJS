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
exports.CategoryTypegooseRepository = void 0;
const mongoose_1 = require("mongoose");
const CategoryTypegooseSchema_1 = require("../../db/schemas/typegooseSchemas/CategoryTypegooseSchema");
class CategoryTypegooseRepository {
    constructor() {
        this.dataModel = CategoryTypegooseSchema_1.Category;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.find({});
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.find({ _id: id });
        });
    }
    getByName(displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.findOne({ displayName });
        });
    }
    getByIdWithProducts(id, includeProducts, includeTop3Products) {
        return __awaiter(this, void 0, void 0, function* () {
            if (includeTop3Products) {
                return this.dataModel.aggregate([
                    { $match: { _id: mongoose_1.Types.ObjectId(id) } },
                    {
                        $lookup: {
                            from: 'products',
                            localField: '_id',
                            foreignField: 'categoryIds',
                            as: 'top3products',
                        },
                    },
                    {
                        $unwind: '$top3products',
                    },
                    {
                        $sort: {
                            'top3products.totalRating': -1,
                        },
                    },
                    { $limit: 3 },
                    {
                        $group: {
                            _id: '$_id',
                            displayName: { $first: '$displayName' },
                            top3products: {
                                $push: '$top3products',
                            },
                        },
                    },
                ]);
            }
            if (includeProducts) {
                return this.dataModel.aggregate([
                    { $match: { _id: mongoose_1.Types.ObjectId(id) } },
                    {
                        $lookup: {
                            from: 'products',
                            localField: '_id',
                            foreignField: 'categoryIds',
                            as: 'products',
                        },
                    },
                ]);
            }
        });
    }
    createCategory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new CategoryTypegooseSchema_1.Category(payload).save();
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.findOneAndUpdate({ _id: id }, payload);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataModel.deleteOne({ _id: id });
        });
    }
}
exports.CategoryTypegooseRepository = CategoryTypegooseRepository;
//# sourceMappingURL=ICategoryTypegooseRepository.js.map