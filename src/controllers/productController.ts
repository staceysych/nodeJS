import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces';

import { ProductService } from '../services';

import { ApiError, validateRating } from '../utils';

import { POSTGRES_DB, INVALID_RATING } from '../utils/constants';

const logger = require('../../logger');

export const rateProductById = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    const ratingData = {
      username: req.user.username,
      productId: req.params.id,
      rating: req.body.rating || 0,
      comment: req.body.comment || '',
    };

    if (!validateRating(+ratingData.rating)) {
      next(ApiError.badRequest(INVALID_RATING));
      return;
    }

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
