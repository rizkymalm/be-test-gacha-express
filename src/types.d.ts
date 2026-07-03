import { Request } from 'express';
import type { Types } from 'mongoose';

// Define the shape of your decoded JWT payload
export interface UserPayload {
    id: Types.ObjectId;
    username: string;
    email: string;
    role?: Types.ObjectId;
}

// Extend the global Express namespace
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export interface PropId {
    id: Types.ObjectId | string | string[]
}