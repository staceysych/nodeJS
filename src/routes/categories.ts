import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { CategoryService } from '../services';

const logger = require('../../logger');
const { Router } = require('express');

const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const data = await CategoryService.getAllCategories();        
        res.status(200).json(data);
        logger.debug(data);
    } catch(e) {
        next(e);
    }
});

router.get('/:id', async (req: Request, res: Response, next) => {
    let data: any;
    const id = req.params.id;

    try {
        data = await CategoryService.getCategoryById(id);

        if (req.query.includeProducts || req.query.includeTop3Products) {
            const includeProducts = req.query.includeProducts && JSON.parse(req.query.includeProducts as string);
            const includeTop3Products = req.query.includeTop3Products && JSON.parse(req.query.includeTop3Products as string);

            data = await CategoryService.getCategoryByIdWithProducts(id, includeProducts, includeTop3Products)
        }

        res.status(200).json(data);
        logger.debug(data);
    } catch(e) {
        next(e);
    }
});

module.exports = router;