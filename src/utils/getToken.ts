import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';

export const getToken = (data: any) => {
    return jwt.sign(data, jwtSecret, {
        expiresIn: 10000000,
    });
}