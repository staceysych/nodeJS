import { Request, Response } from 'express';

import { ApiError, getToken } from '../utils';

const passport = require("passport");

export const login = async (req: Request, res: Response, next: any) => {
    return passport.authenticate('local', { session: false }, async (err: any, user?: any) => {
        if (err) {
          next(ApiError.badRequest('Authentication error, something is not right'));
        }
        if (!user) {
          next(ApiError.unauthorized('Incorrect username or password'));
        }

        const token = getToken({ username: user.username });
    
        return res.status(200).json({ user, token });
    })(req, res, next);
  };