import { Response } from 'express';

import { AdminService } from '../services';

import { IGetUserAuthInfoRequest } from '../interfaces';

import { POSTGRES_DB, ONLY_ADMIN, CATEGORY_WAS_DELETED, PRODUCT_WAS_DELETED } from '../utils/constants';

import { ApiError } from '../utils';
import { isAdmin } from '../utils/authHelpers';

const logger = require('../../logger');

export const getProduct = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const { id } = req.params;
      const data = await AdminService.getProductById(id);
      res.status(200).json(data);
      const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
      logger.debug(convertedData);
    } else {
      next(ApiError.forbidden(ONLY_ADMIN));
      return;
    }
  } catch (e) {
    next(e);
  }
};

export const createNewProduct = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const data = await AdminService.addProduct(req.body);
      const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
      res.status(200).json(data);
      logger.debug(convertedData);
    } else {
      next(ApiError.forbidden(ONLY_ADMIN));
      return;
    }
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const { id } = req.params;
      await AdminService.updateProduct(id, req.body);
      const updatedProduct = await AdminService.getProductById(id);
      res.status(200).json(updatedProduct);
    }
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const { id } = req.params;
      await AdminService.deleteProductById(id);
      res.status(200).send(PRODUCT_WAS_DELETED);
    }
  } catch (e) {
    next(e);
  }
};

export const getCategory = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const { id } = req.params;
      const data = await AdminService.getCategoryById(id);
      res.status(200).json(data);
      const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
      logger.debug(convertedData);
    } else {
      next(ApiError.forbidden(ONLY_ADMIN));
      return;
    }
  } catch (e) {
    next(e);
  }
};

export const createNewCategory = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const data = await AdminService.addCategory(req.body);
      const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
      res.status(200).json(data);
      logger.debug(convertedData);
    } else {
      next(ApiError.forbidden(ONLY_ADMIN));
      return;
    }
  } catch (e) {
    next(e);
  }
};

export const updateCategoryById = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const { id } = req.params;
      await AdminService.updateCategory(id, req.body);
      const updatedProduct = await AdminService.getCategoryById(id);
      res.status(200).json(updatedProduct);
    }
  } catch (e) {
    next(e);
  }
};

export const deleteCategory = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    if (isAdmin(req.user.role)) {
      const { id } = req.params;
      await AdminService.deleteCategoryById(id);
      res.status(200).send(CATEGORY_WAS_DELETED);
    }
  } catch (e) {
    next(e);
  }
};
