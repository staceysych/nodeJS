import { Request, Response } from 'express';

import { ApiError } from '../utils';
import { generateAccessToken, generateRefreshToken } from '../utils/authHelpers';
import { AUTH_ERROR, INCORRECT_CREDENTIALS, POSTGRES_DB } from '../utils/constants';

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

    const { username, role } = process.env.DB === POSTGRES_DB ? user[0] : user;
    const token = generateAccessToken(username, role);
    const refreshToken = generateRefreshToken(role).token;

    const response = {
      status: 'Logged in',
      token,
      refreshToken,
    };

    res.status(200).json(response);
  })(req, res, next);
