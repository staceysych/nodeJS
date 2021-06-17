import { verifyToken } from '../utils/authHelpers';
import {
  renewAccessToken,
  signUp,
  getUsers,
  updateUserProfile,
  updateUserPassword,
} from '../controllers/userController';

import {
  getProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  createNewCategory,
  updateCategoryById,
  deleteCategory,
} from '../controllers/adminController';

import { login } from '../passport/passportMiddleware';

const { Router } = require('express');

const router = Router();

router.get('/', verifyToken, getUsers);

router.post('/register', signUp);

router.post('/authenticate', login);

router.post('/token', renewAccessToken);

router.put('/profile', verifyToken, updateUserProfile);

router.post('/profile/password', verifyToken, updateUserPassword);

router.get('/admin/products/:id', verifyToken, getProduct);

router.post('/admin/products', verifyToken, createNewProduct);

router.patch('/admin/products/:id', verifyToken, updateProduct);

router.delete('/admin/products/:id', verifyToken, deleteProduct);

router.get('/admin/categories/:id', verifyToken, getCategory);

router.post('/admin/categories', verifyToken, createNewCategory);

router.patch('/admin/categories/:id', verifyToken, updateCategoryById);

router.delete('/admin/categories/:id', verifyToken, deleteCategory);

module.exports = router;
