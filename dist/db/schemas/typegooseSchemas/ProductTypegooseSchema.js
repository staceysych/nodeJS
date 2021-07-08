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
const typegoose_1 = require("@typegoose/typegoose");
class ProductClass {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], ProductClass.prototype, "displayName", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Array)
], ProductClass.prototype, "categoryIds", void 0);
__decorate([
    typegoose_1.prop({ required: true, type: () => String }),
    __metadata("design:type", Date)
], ProductClass.prototype, "createdAt", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], ProductClass.prototype, "totalRating", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], ProductClass.prototype, "price", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Array)
], ProductClass.prototype, "ratings", void 0);
const Product = typegoose_1.getModelForClass(ProductClass, { schemaOptions: { collection: 'products' } });
exports.Product = Product;
//# sourceMappingURL=ProductTypegooseSchema.js.map