import { verifyToken } from '../utils/authHelpers';
import { renewAccessToken, signUp, getUsers, updateUserData } from '../controllers/userController';
import { login } from '../passport/passportMiddleware';

const { Router } = require('express');

const router = Router();

router.get('/', verifyToken, getUsers);

router.post('/register', signUp);

router.post('/authenticate', login);

router.post('/token', renewAccessToken);

router.put('/profile', verifyToken, updateUserData);

module.exports = router;