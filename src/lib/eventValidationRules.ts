import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

export const createEventRules = [
    body('event').trim().notEmpty().withMessage('Event Name is required'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required'),

    validate,
];
