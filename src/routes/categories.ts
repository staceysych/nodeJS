import { getAllCategories, getCategoryById } from '../controllers/categoryController';

const { Router } = require('express');

const router = Router();

router.get('/', getAllCategories);

router.get('/:id', getCategoryById);

module.exports = router;
