import { Request, Response } from 'express'

const { Router } = require('express');
const Product = require('../models/product.model');

const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    const allProducts = await Product.find({});

    res.json(allProducts);
});

module.exports = router;