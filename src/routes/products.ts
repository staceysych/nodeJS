import { isBuyer, verifyToken } from '../utils/authHelpers';
import {
  getAllProducts,
  getByDisplayName,
  getByMinRating,
  getByPrice,
  rateProductById,
} from '../controllers/productController';

const { Router } = require('express');

const router = Router();

router.get('/', getAllProducts);

router.get('/getByDisplayName', getByDisplayName);

router.get('/getByMinRating', getByMinRating);

router.get('/getByPrice', getByPrice);

router.post('/:id/rate', verifyToken, isBuyer, rateProductById);

module.exports = router;
