import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import { deleteItem, getItemGroup } from '../controllers/item.controller.js';
import {
    deleteEventItem,
    getEventItem,
    patchUpdateDropRateEventItem,
    postUpdateEventItem,
} from '../controllers/eventItem.controller.ts';

const eventItemRouter = express.Router();

eventItemRouter.get('/list/:event', authenticateToken, getEventItem);
eventItemRouter.post(
    '/admin/update/:event',
    authenticateToken,
    postUpdateEventItem
);
eventItemRouter.patch(
    '/admin/update/drop-rate/:event',
    authenticateToken,
    patchUpdateDropRateEventItem
);
eventItemRouter.delete('/admin/delete/:id', authenticateToken, deleteEventItem);

export default eventItemRouter;
