import { body } from 'express-validator';
import { validate } from '../middleware/validate.ts';

export const loginRules = [
    body('password').trim().notEmpty().withMessage('Password is required'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    validate,
];
