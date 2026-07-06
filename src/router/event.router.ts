import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import {
    getActiveEvent,
    getDetailEvent,
    getEventItemExclude,
    getListEvent,
    patchUpdateStatusEvent,
    postCreateEvent,
    putEditEvent,
} from '../controllers/event.controller.js';
import { createEventRules } from '../lib/eventValidationRules.js';
import { validateAdminRole } from '../middleware/role.middleware.ts';

const eventRouter = express.Router();
//public
eventRouter.get('/active', authenticateToken, getActiveEvent);
//admin
eventRouter.get('/admin/detail/:id', authenticateToken, getDetailEvent);
eventRouter.get('/admin/item/exclude/:id', authenticateToken, validateAdminRole, getEventItemExclude);
eventRouter.get('/admin/list', authenticateToken, validateAdminRole, getListEvent);
eventRouter.post(
    '/admin/create',
    authenticateToken,
    validateAdminRole,
    createEventRules,
    postCreateEvent
);
eventRouter.patch(
    '/admin/update-status/:id',
    authenticateToken,
    validateAdminRole,
    patchUpdateStatusEvent
);
eventRouter.put(
    '/admin/edit/:id',
    authenticateToken,
    validateAdminRole,
    createEventRules,
    putEditEvent
);
// eventRouter.patch(
//     '/admin/update-item/:id',
//     authenticateToken,
//     validateAdminRole,
//     patchUpdateItemEvent
// );

export default eventRouter;
