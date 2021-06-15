import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { jwtConfig } from '../config/config';

import { UserService } from '../services';

import {
  PASSWORD_REGEX,
  USERNAME_REGEX,
  USER_ALREADY_EXISTS,
  INVALID_USER_DATA,
  USER_IS_NOT_AUTHORIZED,
  USER_DOES_NOT_EXIST,
  PASSWORDS_DO_NOT_MATCH,
  POSTGRES_DB,
} from '../utils/constants';
import { refreshTokens, generateAccessToken, generateRefreshToken } from '../utils/authHelpers';
import { comparePasswords } from '../utils/passwordHelpers';
import { ApiError } from '../utils';

const logger = require('../../logger');

export const renewAccessToken = (req: Request, res: Response, next) => {
  const { refreshSecret } = jwtConfig;
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    next(ApiError.forbidden(USER_IS_NOT_AUTHORIZED));
  } else {
    jwt.verify(refreshToken, refreshSecret, (err: any, user: any) => {
      if (err) {
        next(ApiError.forbidden(USER_IS_NOT_AUTHORIZED));
      } else {
        const accessToken = generateAccessToken(user.username, user.role);
        const refresh = generateRefreshToken();
        return res.status(201).json({ accessToken, refreshToken: refresh.token });
      }
    });
  }
};

export const signUp = async (req: Request, res: Response, next) => {
  try {
    const { username, password, firstName, lastName, role } = req.body;
    if (!USERNAME_REGEX.test(username) || !PASSWORD_REGEX.test(password)) {
      next(ApiError.badRequest(INVALID_USER_DATA));
      return;
    }
    const user = await UserService.getOneUser(username);
    const isUser = process.env.DB === POSTGRES_DB ? user.length : user;
    if (!isUser) {
      await UserService.register(username, password, role, firstName, lastName);
      const newUser = await UserService.getOneUser(username);
      const token = generateAccessToken(username, role);
      const refreshToken = generateRefreshToken().token;
      const userToReturn = { token, refreshToken };
      res.status(200).json(userToReturn);
      const convertedUser = process.env.DB === POSTGRES_DB ? JSON.stringify(newUser) : newUser;
      logger.debug(convertedUser);
    } else {
      next(ApiError.forbidden(USER_ALREADY_EXISTS));
      return;
    }
  } catch (e) {
    next(e);
  }
};

export const getUsers = async (req: Request, res: Response, next: any) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(200).json(data);
    const convertedData = process.env.DB === POSTGRES_DB ? JSON.stringify(data) : data;
    logger.debug(convertedData);
  } catch (e) {
    next(e);
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: any) => {
  try {
    const { username } = req.body;
    await UserService.updateProfile(username, req.body);
    const updatedProfile = await UserService.getOneUser(username);

    if (!updatedProfile) {
      next(ApiError.notFound(USER_DOES_NOT_EXIST));
      return;
    }

    res.status(200).json(updatedProfile);
  } catch (e) {
    next(e);
  }
};

export const updateUserPassword = async (req: Request, res: Response, next: any) => {
  try {
    const { username, password, newPassword } = req.body;

    const user = await UserService.getOneUser(username);
    if (!user) {
      next(ApiError.notFound(USER_DOES_NOT_EXIST));
      return;
    }

    const isPasswordMatched = await comparePasswords(password, user);

    if (!isPasswordMatched) {
      next(ApiError.badRequest(PASSWORDS_DO_NOT_MATCH));
      return;
    }

    await UserService.updatePassword(username, newPassword);
    const updatedProfile = await UserService.getOneUser(username);

    res.status(200).json(updatedProfile);
  } catch (e) {
    next(e);
  }
};
