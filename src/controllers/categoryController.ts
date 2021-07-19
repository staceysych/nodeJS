import { Request, Response } from 'express';

import { CategoryService } from '../services';

import { POSTGRES_DB } from '../utils/constants';

const logger = require('../logger');

export const getAllCategories = async (req: Request, res: Response, next: any) => {
  try {
    const data = await CategoryService.getAllCategories();
    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: any) => {
  try {
    let data: any;
    const { id } = req.params;

    data = await CategoryService.getCategoryById(id);

    if (req.query.includeProducts || req.query.includeTop3Products) {
      const includeProducts = req.query.includeProducts && JSON.parse(req.query.includeProducts as string);
      const includeTop3Products = req.query.includeTop3Products && JSON.parse(req.query.includeTop3Products as string);

      data = await CategoryService.getCategoryByIdWithProducts(id, includeProducts, includeTop3Products);
    }
    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
};
