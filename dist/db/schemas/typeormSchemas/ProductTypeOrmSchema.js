"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const CategoryTypeOrmSchema_1 = require("./CategoryTypeOrmSchema");
let Product = class Product {
    constructor() {
        this.created_at = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column('varchar', { length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "display_name", void 0);
__decorate([
    typeorm_1.Column('int', { array: true, nullable: true }),
    typeorm_1.OneToMany(() => CategoryTypeOrmSchema_1.Category, (category) => category.id),
    __metadata("design:type", Array)
], Product.prototype, "category_ids", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: 'now()' }),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "total_rating", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
Product = __decorate([
    typeorm_1.Entity({ name: 'product' })
], Product);
exports.Product = Product;
//# sourceMappingURL=ProductTypeOrmSchema.js.map