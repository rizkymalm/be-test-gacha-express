import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import {
    getRoleDetail,
    getRoleList,
    getRoleLogin,
} from '../controllers/role.controller.js';
import { validateAdminRole } from '../middleware/role.middleware.js';

const roleRouter = express.Router();

roleRouter.get('/login', authenticateToken, getRoleLogin);
roleRouter.get(
    '/admin/list',
    authenticateToken,
    validateAdminRole,
    getRoleList
);
roleRouter.get(
    '/admin/detail/:id',
    authenticateToken,
    validateAdminRole,
    getRoleDetail
);

export default roleRouter;
