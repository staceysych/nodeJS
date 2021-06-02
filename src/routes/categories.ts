import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { CategoryService } from '../services';

const { Router } = require('express');

const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const data = await CategoryService.getAllCategories();        
        res.status(200).json(data);
    } catch(e) {
        next(e);
    }
});

router.get('/:id', async (req: Request, res: Response, next) => {
    let data: any;
    const id = req.params.id;

    try {
        data = await CategoryService.getCategoryById(id);

        if(req.query.includeProducts || req.query.includeTop3Products) {
            data = await CategoryService.getCategoryByIdWithProducts(id, req.query.includeProducts as string, req.query.includeTop3Products as string);

            if(!data) {
                next(ApiError.badRequest('Bad request. Your request should be the following format: id?includeProducts=true&includeTop3Products=true'));
                return;
            }
        }

        if(!data) {
            next(ApiError.notFound(`Nothing was found for this ID - ${req.params.id}`));
            return;
        }

        res.status(200).json(data);
    } catch(e) {
        next(e);
    }
});

module.exports = router;