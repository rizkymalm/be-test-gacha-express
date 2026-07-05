import type { Request, Response } from 'express';
import { userProfile } from '../services/user.service.js';

export async function getProfile(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const user = await userProfile({ id: userId });
        res.json({
            message: 'get profile success',
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
