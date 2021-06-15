import { Request, Response } from 'express';

import { ApiError } from '../utils';
import { generateAccessToken, generateRefreshToken } from '../utils/authHelpers';
import { AUTH_ERROR, INCORRECT_CREDENTIALS } from '../utils/constants';

const passport = require('passport');

export const login = async (req: Request, res: Response, next: any) =>
  passport.authenticate('local', { session: false }, async (err: any, user?: any) => {
    if (err) {
      next(ApiError.badRequest(AUTH_ERROR));
      return;
    }
    if (!user) {
      next(ApiError.unauthorized(INCORRECT_CREDENTIALS));
      return;
    }

    const token = generateAccessToken(user.username, user.role);
    const refreshToken = generateRefreshToken().token;

    const response = {
      status: 'Logged in',
      token,
      refreshToken,
    };

    res.status(200).json(response);
  })(req, res, next);
