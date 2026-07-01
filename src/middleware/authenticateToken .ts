import type { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import type { UserPayload } from '../types.js';

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response => {
    // 1. Read the Authorization header from the incoming request
    const authHeader = req.headers['authorization'];

    // 2. Check if the header exists and split it
    // Standard format sent by frontend: "Bearer <token_value>"
    const token = authHeader && authHeader.split(' ')[1];
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || ''

    // If the header is completely missing, return 401 Unauthorized
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Authentication token required' });
    }

    // 3. Verify the token using your secret key
    jwt.verify(token, accessTokenSecret, (err, userPayload) => {
        if (err) {
            // If token is expired, send a specific code so frontend can refresh it
            if (err.name === 'TokenExpiredError') {
                return res
                    .status(401)
                    .json({
                        code: 'TOKEN_EXPIRED',
                        message: 'Token has expired',
                    });
            }
            // If token is forged, altered, or uses an invalid secret
            return res
                .status(403)
                .json({ message: 'Invalid or tampered token' });
        }

        // 4. Attach the decoded user payload data to the 'req' object
        // This makes the logged-in user's details available in the next functions
        req.user = userPayload as UserPayload;

        // 5. Move on to the actual API route handler
        next();
    });
};
