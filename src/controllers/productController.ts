import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces';

import { ProductService, RatingsService } from '../services';

import { ApiError, convertDateToTimestamp, validateRating } from '../utils';

import { POSTGRES_DB, INVALID_RATING } from '../utils/constants';

const logger = require('../../logger');

export const rateProductById = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    const ratingData = {
      username: req.user.username,
      productId: req.params.id,
      rating: req.body.rating || 0,
      comment: req.body.comment || '',
      createdAt: convertDateToTimestamp(),
    };

    if (!validateRating(+ratingData.rating)) {
      next(ApiError.badRequest(INVALID_RATING));
      return;
    }

    await RatingsService.addRating(ratingData);
    const result = await ProductService.rateProduct(ratingData);
    const updatedProduct =
      process.env.DB === POSTGRES_DB ? result.ratingToRes : await ProductService.getProductById(req.params.id);
    const converted = process.env.DB === POSTGRES_DB ? JSON.stringify(updatedProduct) : updatedProduct;

    res.status(200).json(updatedProduct);
    logger.debug(converted);
  } catch (e) {
    next(e);
  }
};

export const get10LastRatings = async (req: Request, res: Response, next: any) => {
  try {
    const ratings = await RatingsService.getLastRatings();
    res.status(200).json(ratings);
    logger.debug(JSON.stringify(ratings));
  } catch (e) {
    next(e);
  }
};
