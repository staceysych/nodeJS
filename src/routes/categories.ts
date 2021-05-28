import { Request, Response } from 'express'
import { ObjectId } from 'mongoose';
import { CategoryService } from '../services';

const { Router } = require('express');

const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const data = await CategoryService.getAllCategories();
        res.status(200).json(data);
    } catch(e) {
        res.status(500).send({ "err": e })
    }
});

router.get('/:id', async (req: Request, res: Response, next) => {
    let data: any;
    const id = req.params.id;

    try {
        data = await CategoryService.getCategoryById(id);

        if(req.query.includeProducts || req.query.includeTop3Products) {
            data = await CategoryService.getCategoryByIdWithProducts(id, req.query.includeProducts as string, req.query.includeTop3Products as string)
        }

        res.status(200).json(data);
    } catch(e) {
        res.status(500).send({ "err": e })
    }
});

module.exports = router;