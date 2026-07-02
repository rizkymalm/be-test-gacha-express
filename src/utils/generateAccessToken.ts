import type { UserPayload } from '../types.js';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: UserPayload): string => {
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '15m' }
    );
};

export const generateRefreshToken = (user: UserPayload): string => {
    return jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: '7d' }
    );
};
