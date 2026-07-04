import type { UserPayload } from '../types.js';
import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms'; // Import the type used by jsonwebtoken
import 'dotenv/config';

export const generateAccessToken = (user: UserPayload): string => {
    const expiresIn = (process.env.JWT_EXPIRES_IN || '15m') as StringValue;
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn });
};

export const generateRefreshToken = (user: UserPayload): string => {
    const expiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ||
        '7d') as StringValue;
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn });
};
