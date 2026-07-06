import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import {
    deleteEventItem,
    getEventItem,
    patchUpdateDropRateEventItem,
    postAddEventItem,
} from '../controllers/eventItem.controller.js';
import {
    validateDropRateEventItem,
    validateDropRateEventItemUpdate,
} from '../middleware/eventItem.middleware.js';
import { validateAdminRole } from '../middleware/role.middleware.js';

const eventItemRouter = express.Router();

eventItemRouter.get('/list/:event', authenticateToken, getEventItem);
eventItemRouter.post(
    '/admin/add-item/:event',
    validateDropRateEventItem,
    authenticateToken,
    validateAdminRole,
    postAddEventItem
);
eventItemRouter.patch(
    '/admin/update/drop-rate/:event',
    validateDropRateEventItemUpdate,
    authenticateToken,
    validateAdminRole,
    patchUpdateDropRateEventItem
);
eventItemRouter.delete(
    '/admin/delete/:id',
    authenticateToken,
    validateAdminRole,
    deleteEventItem
);

export default eventItemRouter;
