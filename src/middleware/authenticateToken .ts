import type { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import type { UserPayload } from '../types.js';

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Authentication token required' });
    }

    jwt.verify(token, accessTokenSecret, (err, userPayload) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    code: 'TOKEN_EXPIRED',
                    message: 'Token has expired',
                });
            }
            return res
                .status(403)
                .json({ message: 'Invalid or tampered token' });
        }

        req.user = userPayload as UserPayload;
        next();
    });
};
