import { Request, Response } from 'express'
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

module.exports = router;