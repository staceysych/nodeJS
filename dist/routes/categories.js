"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryController_1 = require("../controllers/categoryController");
const { Router } = require('express');
const router = Router();
router.get('/', categoryController_1.getAllCategories);
router.get('/:id', categoryController_1.getCategoryById);
module.exports = router;
//# sourceMappingURL=categories.js.map