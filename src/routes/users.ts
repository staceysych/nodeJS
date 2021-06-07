import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiError } from '../utils/ApiError';
import { UserService } from '../services';
import { User } from '../db/schemas/typegooseSchemas/UserTypegooseSchema';
import { PASSWORD_REGEX, USERNAME_REGEX } from '../utils/constants';

import { jwtSecret } from '../config/config';

const logger = require('../../logger');
const { Router } = require('express');
const bcrypt = require('bcrypt');


const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
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
            next(ApiError.badRequest('Invalid username or password.'));
            return;
        }


        await UserService.register(username, password); 

        const newUser = await User.findOne({ username });
        const token = jwt.sign({ username }, jwtSecret, {
            expiresIn: 10000000,
          });
          const userToReturn = { ...newUser?.toJSON(), ...{ token } };
  
          res.status(200).json(userToReturn);
    } catch(e) {
        next(e);
    }
});

module.exports = router;