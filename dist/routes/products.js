"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authHelpers_1 = require("../utils/authHelpers");
const productController_1 = require("../controllers/productController");
const { Router } = require('express');
const router = Router();
router.get('/', productController_1.getAllProducts);
router.get('/getByDisplayName', productController_1.getByDisplayName);
router.get('/getByMinRating', productController_1.getByMinRating);
router.get('/getByPrice', productController_1.getByPrice);
router.post('/:id/rate', authHelpers_1.verifyToken, authHelpers_1.isBuyer, productController_1.rateProductById);
module.exports = router;
//# sourceMappingURL=products.js.map