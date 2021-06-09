import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiError, getToken } from '../utils';
import { UserService } from '../services';
import { User } from '../db/schemas/typegooseSchemas/UserTypegooseSchema';
import { PASSWORD_REGEX, USERNAME_REGEX, USER_ALREADY_EXISTS, INVALID_USER_DATA, USER_DOES_NOT_EXIST } from '../utils/constants';
import { login } from '../passport/passportMiddleware';

import { jwtSecret } from '../config/config';

const logger = require('../../logger');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const passport = require("passport");


const router = Router();

router.get('/', async (req: Request, res: Response, next: any) => {
    try {
        const data = await UserService.getAllUsers();        
        res.status(200).json(data);
        logger.debug(data);
    } catch(e) {
        next(e);
    }
});

router.post('/register', async (req: Request, res: Response, next) => {
    try {
        const { username, password } = req.body; 
        if (!USERNAME_REGEX.test(username) || !PASSWORD_REGEX.test(password)) {
            next(ApiError.badRequest(INVALID_USER_DATA));
            return;
        }
        const user = await User.findOne({ username });

        if (!user) {
            await UserService.register(username, password); 

            const newUser = await User.findOne({ username });
            const token = getToken({ username });
            const userToReturn = { ...newUser?.toJSON(), ...{ token } };
      
              res.status(200).json(userToReturn);
        } else {
            next(ApiError.forbidden(USER_ALREADY_EXISTS));
            return;
        }
    } catch(e) {
        next(e);
    }
});

router.post('/authenticate', login);

module.exports = router;