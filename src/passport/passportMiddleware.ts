import { Request, Response } from 'express';

import { ApiError } from '../utils';
import { generateAccessToken, generateRefreshToken } from '../utils/authHelpers';
import { AUTH_ERROR, INCORRECT_CREDENTIALS } from '../utils/constants';

const logger = require('../../logger');

const passport = require("passport");

export const login = async (req: Request, res: Response, next: any) => {
    return passport.authenticate('local', { session: false }, async (err: any, user?: any) => {
        if (err) {
          next(ApiError.badRequest(AUTH_ERROR));
          return;
        }
        if (!user) {
          next(ApiError.unauthorized(INCORRECT_CREDENTIALS));
          return;
        }

        const token = generateAccessToken(user.username);
        const refreshToken = generateRefreshToken().token;

        const response = {
            "status": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        }

        return res.status(200).json({ ...user.toJSON(), ...response });
    })(req, res, next);
  };