import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

export const loginRules = [
    body('password').trim().notEmpty().withMessage('Password is required'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    validate,
];

export const registerRules = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    body('password').trim().notEmpty().withMessage('Password is required'),
    body('firstName').trim().notEmpty().withMessage('Password is required'),
    body('role').trim().notEmpty().withMessage('Password is required'),
    validate,
];


export const createUserRules = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    body('firstName').trim().notEmpty().withMessage('Password is required'),
    body('role').trim().notEmpty().withMessage('Password is required'),
    validate,
];
