import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .ts';
import { getItem, getItemGroup } from '../controllers/item.controller.ts';

const itemRouter = express.Router();

itemRouter.get('/', authenticateToken, getItem);
itemRouter.get('/group', authenticateToken, getItemGroup);

export default itemRouter;
