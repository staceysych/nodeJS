import { Request, Response } from 'express';
import { getSortCriteria } from '../utils/getSortCriteria';
import { IGetUserAuthInfoRequest } from '../interfaces';

import { ProductService, RatingsService } from '../services';

import { ApiError, convertDateToTimestamp, validateRating } from '../utils';

import {
  POSTGRES_DB,
  INVALID_RATING,
  NOTHING_FOUND_BY_DISPLAY_NAME,
  MIN_RATING_ERROR,
  NOTHING_FOUND_BY_MIN_RATING,
  PRICE_ERROR,
  NOTHING_FOUND_BY_PRICE,
} from '../utils/constants';

const logger = require('../logger');

export const getAllProducts = async (req: Request, res: Response, next: any) => {
  try {
    const limit = parseInt(req.query.limit as string, 10);
    const skip = parseInt(req.query.skip as string, 10);

    const data = await ProductService.getAllProducts(limit, skip);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
};

export const getByDisplayName = async (req: Request, res: Response, next: any) => {
  try {
    const displayName = req.query.displayName as string;
    const data = await ProductService.getByDisplayName(displayName);

    if (!data.length) {
      next(ApiError.notFound(`${NOTHING_FOUND_BY_DISPLAY_NAME} - ${req.query.displayName}`));
      return;
    }
    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
};

export const getByMinRating = async (req: Request, res: Response, next: any) => {
  try {
    let data: any;
    const rating = parseInt(req.query.minRating as string, 10);

    if (req.query.sortBy) {
      const { field, direction } = getSortCriteria(req);

      data = await ProductService.getByRating(rating, field, direction);
    } else {
      data = await ProductService.getByRating(rating);
    }

    if (!data) {
      next(ApiError.badRequest(MIN_RATING_ERROR));
      return;
    }

    if (!data.length) {
      next(ApiError.notFound(`${NOTHING_FOUND_BY_MIN_RATING} - ${req.query.minRating}`));
      return;
    }
    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
};

export const getByPrice = async (req: Request, res: Response, next: any) => {
  try {
    let data: any;
    const price = req.query.price as string;

    if (req.query.sortBy) {
      const { field, direction } = getSortCriteria(req);
      data = await ProductService.getByPrice(price, field, direction);
    } else {
      data = await ProductService.getByPrice(price);
    }

    if (!data) {
      next(ApiError.badRequest(PRICE_ERROR));
      return;
    }

    if (!data.length) {
      next(ApiError.notFound(`${NOTHING_FOUND_BY_PRICE} - ${req.query.price}`));
      return;
    }
    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
};

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
