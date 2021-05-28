import { Request, Response } from 'express'
import { ProductService } from '../services';
import { getSortCriteria } from '../utils/getSortCriteria';

const { Router } = require('express');


const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        let data: any;
        const limit = parseInt(req.query.limit as string); 
        const skip = parseInt(req.query.skip as string);

        data = await ProductService.getAllProducts(limit, skip);

        if(Object.keys(req.query).length) {
            if(req.query.displayName) {
                const displayName = req.query.displayName as string;
                data = await ProductService.getByDisplayName(displayName);
            }

            if(req.query.minRating) {
                const rating = req.query.minRating as string;

                if(req.query.sortBy) {
                    const { field, direction } = getSortCriteria(req);

                    data = await ProductService.getByRating(rating, field, direction);
                } else {
                    data = await ProductService.getByRating(rating);
                }                
            }

            if(req.query.price) {
                const price = req.query.price as string;

                if(req.query.sortBy) {
                    const { field, direction } = getSortCriteria(req);
                    data = await ProductService.getByPrice(price, field, direction);
                } else {
                    data = await ProductService.getByPrice(price);
                }
                
            }
        }
        res.status(200).json(data);
    } catch(e) {
        res.status(500).send({ "err": e })
    }
});

module.exports = router;