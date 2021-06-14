import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ProductService } from '../services';
import { getSortCriteria } from '../utils/getSortCriteria';
import { POSTGRES_DB } from '../utils/constants';

const { Router } = require('express');
const logger = require('../../logger');

const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
  try {
    let data: any;
    const limit = parseInt(req.query.limit as string, 10);
    const skip = parseInt(req.query.skip as string, 10);

    data = await ProductService.getAllProducts(limit, skip);

    if (Object.keys(req.query).length) {
      if (req.query.displayName) {
        const displayName = req.query.displayName as string;
        data = await ProductService.getByDisplayName(displayName);

        if (!data.length) {
          next(ApiError.notFound(`Nothing was found for this display name - ${req.query.displayName}`));
          return;
        }
      }

      if (req.query.minRating) {
        const rating = parseInt(req.query.minRating as string, 10);

        if (req.query.sortBy) {
          const { field, direction } = getSortCriteria(req);

          data = await ProductService.getByRating(rating, field, direction);
        } else {
          data = await ProductService.getByRating(rating);
        }

        if (!data) {
          next(ApiError.badRequest('Bad request. You need to write the request as ?minRating=2'));
          return;
        }

        if (!data.length) {
          next(ApiError.notFound(`Nothing was found for minRating - ${req.query.minRating}`));
          return;
        }
      }

      if (req.query.price) {
        const price = req.query.price as string;

        if (req.query.sortBy) {
          const { field, direction } = getSortCriteria(req);
          data = await ProductService.getByPrice(price, field, direction);
        } else {
          data = await ProductService.getByPrice(price);
        }

        if (!data) {
          next(
            ApiError.badRequest(
              'Bad request. You need to write the request as ?price=10:50 (to set a price range) or ?price=10 (to get products with the price more than 10) or ?price=:50 (to get products with the price less than 50)'
            )
          );
          return;
        }

        if (!data.length) {
          next(ApiError.notFound(`Nothing was found for price - ${req.query.price}`));
          return;
        }
      }
    }

    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
