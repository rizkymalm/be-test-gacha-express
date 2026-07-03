import type { NextFunction, Request, Response } from 'express';
import { dropRateRange } from '../utils/dropRateRange.ts';
import { dropRateMax } from '../constants/item.constant.ts';
import type { PropsTierRange } from '../types/item.type.ts';

export const validateDropRate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { tier, dropRate } = req.body;
    const index = dropRateMax.findIndex(
        (item: PropsTierRange) => item.tier === tier
    );
    const min = dropRateMax[index]?.min || 0;
    const max = dropRateMax[index]?.max || 0;
    const check = dropRateRange({ tier, value: parseInt(dropRate) });
    if (!check) {
        return res.status(422).json({
            status: 'Unprocessable Entity',
            errors: {
                field: 'dropRate',
                message: `Drop rate range must between ${min}% - ${max}%`,
            },
        });
    }

    next();
};
