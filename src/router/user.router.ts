import express from 'express';
import {
    getDetailUser,
    getListUser,
    getProfile,
    getUserInventory,
    getUserInventoryLatest,
    postCreateUser,
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/authenticateToken .js';
import { validateAdminRole } from '../middleware/role.middleware.js';
import { createUserRules } from '../lib/userValidationRules.js';

const userRouter = express.Router();

userRouter.get('/profile', authenticateToken, getProfile);
userRouter.get('/inventory', authenticateToken, getUserInventory);
userRouter.get('/inventory/latest', authenticateToken, getUserInventoryLatest);

//admin
userRouter.get('/admin/list', authenticateToken, validateAdminRole, getListUser);
userRouter.get(
    '/admin/detail/:user',
    authenticateToken,
    validateAdminRole,
    getDetailUser
);
userRouter.post('/admin/create', createUserRules, authenticateToken, postCreateUser);
userRouter.patch(
    '/admin/wallet/inject/:user',
    authenticateToken,
    validateAdminRole,
    getUserInventoryLatest
);

export default userRouter;
