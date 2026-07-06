import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import {
    deleteItem,
    getItemList,
    getItemGroup,
    postCreateItem,
    putUpdateItem,
} from '../controllers/item.controller.js';
import {
    createItemRules,
} from '../lib/itemValidationRules.js';
import { validateAdminRole } from '../middleware/role.middleware.js';

const itemRouter = express.Router();
itemRouter.get('/group', authenticateToken, getItemGroup);
itemRouter.get('/admin/list', authenticateToken, validateAdminRole, getItemList);
itemRouter.post(
    '/admin/create',
    createItemRules,
    authenticateToken,
    validateAdminRole,
    postCreateItem
);
itemRouter.put(
    '/admin/update/:id',
    createItemRules,
    authenticateToken,
    validateAdminRole,
    putUpdateItem
);

itemRouter.delete(
    '/admin/delete/:id',
    authenticateToken,
    validateAdminRole,
    deleteItem
);

export default itemRouter;
