import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import {
    getActiveEvent,
    getDetailEvent,
    getEventItemExclude,
    getListEvent,
    patchUpdateItemEvent,
    patchUpdateStatusEvent,
    postCreateEvent,
    putEditEvent,
} from '../controllers/event.controller.js';
import { createEventRules } from '../lib/eventValidationRules.js';

const eventRouter = express.Router();

eventRouter.get('/list', authenticateToken, getListEvent);
eventRouter.get('/active', authenticateToken, getActiveEvent);
eventRouter.get('/detail/:id', authenticateToken, getDetailEvent);
eventRouter.get('/item/exclude/:id', authenticateToken, getEventItemExclude);
eventRouter.post(
    '/create',
    authenticateToken,
    createEventRules,
    postCreateEvent
);
eventRouter.patch(
    '/update-status/:id',
    authenticateToken,
    patchUpdateStatusEvent
);
eventRouter.put('/edit/:id', authenticateToken, createEventRules, putEditEvent);
eventRouter.patch('/update-item/:id', authenticateToken, patchUpdateItemEvent);

export default eventRouter;
