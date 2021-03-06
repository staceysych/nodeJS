import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { Response } from 'express';

import { jwtConfig } from '../config/config';
import { ApiError } from './apiError';
import { IGetUserAuthInfoRequest } from '../interfaces';
import { USER_IS_NOT_AUTHORIZED, ROLES, ONLY_ADMIN, ONLY_BUYER } from './constants';

const { tokens, jwtSecret, refreshSecret } = jwtConfig;

export const refreshTokens: string[] = [];

export const generateAccessToken = (username: string, role: string) => {
  const payload = {
    username,
    type: tokens.access.type,
    role: role || ROLES.buyer,
  };
  const options = { expiresIn: tokens.access.expiresIn };

  return jwt.sign(payload, jwtSecret, options);
};

export const generateRefreshToken = (role: string) => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type,
    role,
  };

  const options = { expiresIn: tokens.refresh.expiresIn };
  const token = jwt.sign(payload, refreshSecret, options);
  refreshTokens.push(token);

  return {
    id: payload.id,
    token,
  };
};

export const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err: any, user: any) => {
      if (err) {
        next(ApiError.forbidden(USER_IS_NOT_AUTHORIZED));
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    next(ApiError.forbidden(USER_IS_NOT_AUTHORIZED));
  }
};

export const isAdmin = (req: IGetUserAuthInfoRequest, res: Response, next) => {
  if (req.user.role === ROLES.admin) {
    next();
  } else {
    next(ApiError.forbidden(ONLY_ADMIN));
  }
};

export const isBuyer = (req: IGetUserAuthInfoRequest, res: Response, next) => {
  if (req.user.role === ROLES.buyer) {
    next();
  } else {
    next(ApiError.forbidden(ONLY_BUYER));
  }
};
