import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces';

import { ProductService } from '../services';

import { ApiError } from '../utils';
import { isAdmin } from '../utils/authHelpers';

const logger = require('../../logger');

export const rateProductById = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (!isAdmin(req.user.role)) {
      const ratingData = {
        username: req.user.username,
        productId: req.params.id,
        rating: req.body.rating || 0,
        comment: req.body.comment || '',
      };

      await ProductService.rateProduct(ratingData);
      const updatedProduct = await ProductService.getProductById(req.params.id);
      res.status(200).json(updatedProduct);
      logger.debug(updatedProduct);
    } else {
      next(ApiError.forbidden('Only buyers can rate products'));
      return;
    }
  } catch (e) {
    next(e);
  }
};
