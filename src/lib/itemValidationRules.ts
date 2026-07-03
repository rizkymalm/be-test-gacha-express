import { body } from 'express-validator';
import { validate } from '../middleware/validate.ts';

export const createItemRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('image').trim().notEmpty().withMessage('Image is required'),
    body('tier')
        .trim()
        .notEmpty()
        .withMessage('Tier is required')
        .isIn(['SILVER', 'GOLD', 'DIAMOND', 'LEGENDARY'])
        .withMessage('Tier must be one of: SILVER, GOLD, DIAMOND, LEGENDARY'),
    body('dropRate')
        .exists({ checkFalsy: true })
        .withMessage('Drop Rate is required')
        .isNumeric()
        .withMessage('Drop Rate must be a number'),

    validate,
];

export const editDropRateRules = [
    body('tier')
        .trim()
        .notEmpty()
        .withMessage('Tier is required')
        .isIn(['SILVER', 'GOLD', 'DIAMOND', 'LEGENDARY'])
        .withMessage('Tier must be one of: SILVER, GOLD, DIAMOND, LEGENDARY'),
    body('dropRate')
        .exists({ checkFalsy: true })
        .withMessage('Drop Rate is required')
        .isNumeric()
        .withMessage('Drop Rate must be a number'),

    validate,
];
