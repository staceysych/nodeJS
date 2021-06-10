import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { jwtConfig } from '../config/config';

import { User } from '../db/schemas/typegooseSchemas/UserTypegooseSchema';

import { UserService } from '../services';

import { PASSWORD_REGEX, USERNAME_REGEX, USER_ALREADY_EXISTS, INVALID_USER_DATA, USER_IS_NOT_AUTHORIZED, USER_DOES_NOT_EXIST } from '../utils/constants';
import { refreshTokens, generateAccessToken, generateRefreshToken } from '../utils/authHelpers';
import { ApiError } from '../utils';

const logger = require('../../logger');

export const renewAccessToken = (req: Request, res: Response, next) => {
    const { refreshSecret } = jwtConfig;
    const refreshToken = req.body.refreshToken;

    if(!refreshToken || !refreshTokens.includes(refreshToken)) {
        next(ApiError.forbidden(USER_IS_NOT_AUTHORIZED));
    } else {
        jwt.verify(refreshToken, refreshSecret, (err: any, user: any) => {
            if(err) {
                next(ApiError.forbidden(USER_IS_NOT_AUTHORIZED));
              } else {
                  const accessToken = generateAccessToken(user.username);
                  return res.status(201).json({ accessToken });
              }
        })
    }
}

export const signUp = async (req: Request, res: Response, next) => {
    try {
        const { username, password, firstName, lastName } = req.body; 
        if (!USERNAME_REGEX.test(username) || !PASSWORD_REGEX.test(password)) {
            next(ApiError.badRequest(INVALID_USER_DATA));
            return;
        }
        const user = await User.findOne({ username });

        if (!user) {
            await UserService.register(username, password, firstName, lastName); 

            const newUser = await User.findOne({ username });
            const token = generateAccessToken(username);
            const refreshToken = generateRefreshToken().token;
            const userToReturn = { ...newUser?.toJSON(), ...{ token, refreshToken } };
      
              res.status(200).json(userToReturn);
              logger.debug(newUser);
        } else {
            next(ApiError.forbidden(USER_ALREADY_EXISTS));
            return;
        }
    } catch(e) {
        next(e);
    }
}

export const getUsers = async (req: Request, res: Response, next: any) => {
    try {
        const data = await UserService.getAllUsers();        
        res.status(200).json(data);
        logger.debug(data);
    } catch(e) {
        next(e);
    }
}

export const updateUserData = async (req: Request, res: Response, next: any) => {
    try {
        const { username } = req.body;
        await UserService.updateUserProfile(username, req.body);
        const updatedProfile = await User.findOne({ username });      

        res.status(200).json(updatedProfile);
        logger.debug(updatedProfile);
    } catch(e) {
        next(e);
    }
}