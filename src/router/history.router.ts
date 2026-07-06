import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import { validateAdminRole } from '../middleware/role.middleware.js';
import { getHistoryList } from '../controllers/history.controller.js';

const historyRouter = express.Router();

historyRouter.get(
    '/admin/list',
    authenticateToken,
    validateAdminRole,
    getHistoryList
);

export default historyRouter;
