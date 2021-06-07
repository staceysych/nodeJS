import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { UserService } from '../services';

const logger = require('../../logger');
const { Router } = require('express');

const router = Router();

router.post('/register', async (req: Request, res: Response, next) => {
    try {
        const data = await UserService.register();        
        res.status(200).json(data);
        logger.debug(data);
    } catch(e) {
        next(e);
    }
});

module.exports = router;