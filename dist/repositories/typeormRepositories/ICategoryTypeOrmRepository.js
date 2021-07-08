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
exports.CategoryTypeOrmRepository = void 0;
const typeorm_1 = require("typeorm");
const CategoryTypeOrmSchema_1 = require("../../db/schemas/typeormSchemas/CategoryTypeOrmSchema");
const services_1 = require("../../services");
let CategoryTypeOrmRepository = class CategoryTypeOrmRepository extends typeorm_1.Repository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({});
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ id });
        });
    }
    getByName(displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ display_name: displayName });
        });
    }
    getByIdWithProducts(id, includeProducts, includeTop3Products) {
        return __awaiter(this, void 0, void 0, function* () {
            if (includeProducts || includeTop3Products) {
                const category = yield this.findOne({ id });
                if (category) {
                    const products = yield services_1.ProductService.getAllProducts();
                    const ProductWithGivenCategory = products.filter((product) => product.category_ids.includes(+id));
                    const categoryWithProducts = {
                        id: category.id,
                        display_name: category.display_name,
                        products: ProductWithGivenCategory || [],
                    };
                    if (includeTop3Products) {
                        categoryWithProducts.products = categoryWithProducts.products
                            .sort((a, b) => b.total_rating - a.total_rating)
                            .slice(0, 3);
                    }
                    return categoryWithProducts;
                }
            }
        });
    }
    createCategory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCategory = yield this.createQueryBuilder('category').insert().into(CategoryTypeOrmSchema_1.Category).values(payload).execute();
            return this.findOne({ id: createdCategory.raw[0].id });
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('category').update().set(payload).where({ id }).execute();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('category').delete().from(CategoryTypeOrmSchema_1.Category).where({ id }).execute();
        });
    }
};
CategoryTypeOrmRepository = __decorate([
    typeorm_1.EntityRepository(CategoryTypeOrmSchema_1.Category)
], CategoryTypeOrmRepository);
exports.CategoryTypeOrmRepository = CategoryTypeOrmRepository;
//# sourceMappingURL=ICategoryTypeOrmRepository.js.map