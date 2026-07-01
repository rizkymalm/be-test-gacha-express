import { Request } from 'express';

// Define the shape of your decoded JWT payload
export interface UserPayload {
    id: string;
    username: string;
    role?: string;
}

// Extend the global Express namespace
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
