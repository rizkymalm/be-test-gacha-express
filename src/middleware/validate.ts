import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 'Unprocessable Entity',
            errors: errors
                .array()
                .map((err: any) => ({ field: err?.path, message: err.msg })),
        });
    }

    next();
};
