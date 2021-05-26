import { Request, Response } from 'express'
import { ProductService } from '../services';

const { Router } = require('express');


const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const data = await ProductService.getAllProducts();
        res.status(200).json(data);
    } catch(e) {
        res.status(500).send({ "err": e })
    }
});

router.get('/displayName=:displayName', async (req: Request, res: Response, next) => {
    try {
        const data = await ProductService.getByDisplayName(req.params.displayName);
        res.status(200).json(data);

    } catch(e) {
        res.status(500).send({ "err": e })
    }
});

router.get('/minRating=:ratingValue', async (req: Request, res: Response, next) => {
    try {
        const data = await ProductService.getByRating(req.params.ratingValue);
        res.status(200).json(data);

    } catch(e) {
        res.status(500).send({ "err": e })
    }
});

router.get('/price=:priceParam', async (req: Request, res: Response, next) => {
    try {
        const data = await ProductService.getByPrice(req.params.priceParam);
        res.status(200).json(data);

    } catch(e) {
        res.status(500).send({ "err": e })
    }
});

module.exports = router;