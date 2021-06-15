import { Response } from 'express';

import { AdminService } from '../services';

import { IGetUserAuthInfoRequest } from '../interfaces';

import { POSTGRES_DB, ONLY_ADMIN } from '../utils/constants';

import { ApiError } from '../utils';

const logger = require('../../logger');

export const getProduct = async (req: IGetUserAuthInfoRequest, res: Response, next: any) => {
  try {
    const isAdmin = req.user.role === 'admin';
    if (isAdmin) {
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
