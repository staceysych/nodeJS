"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    displayName: { type: String, required: true },
}, { collection: 'categories' });
const Category = mongoose_1.model('Category', CategorySchema);
module.exports = Category;
//# sourceMappingURL=category.model.js.map