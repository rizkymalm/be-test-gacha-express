import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import {
    deleteItem,
    getItem,
    getItemGroup,
    patchEditDropRate,
    postCreateItem,
    putUpdateItem,
} from '../controllers/item.controller.js';
import { validateDropRate } from '../middleware/item.middleware.js';
import { createItemRules, editDropRateRules } from '../lib/itemValidationRules.js';

const itemRouter = express.Router();

itemRouter.get('/', authenticateToken, getItem);
itemRouter.get('/group', authenticateToken, getItemGroup);
itemRouter.post(
    '/create',
    createItemRules,
    validateDropRate,
    authenticateToken,
    postCreateItem
);
itemRouter.put(
    '/update/:id',
    createItemRules,
    validateDropRate,
    authenticateToken,
    putUpdateItem
);
itemRouter.patch(
    '/edit/drop-rate/:id',
    editDropRateRules,
    validateDropRate,
    authenticateToken,
    patchEditDropRate
);
itemRouter.delete('/delete/:id', authenticateToken, deleteItem)

export default itemRouter;
