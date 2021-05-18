"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    displayName: { type: String, required: true },
    categoryIds: { type: [mongoose_1.Types.ObjectId], required: true },
    createdAt: { type: Date, required: true },
    totalRating: { type: Number, required: true },
    price: { type: Number, required: true },
}, { collection: 'products' });
const Product = mongoose_1.model('Product', ProductSchema);
module.exports = Product;
//# sourceMappingURL=product.model.js.map