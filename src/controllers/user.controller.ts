import type { Request, Response } from 'express';
import { userProfile } from '../services/user.service.js';
import {
    myInventory,
    myLatestInventory,
} from '../services/inventory.service.ts';

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

export async function getUserInventory(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const page = req.query.page;
        const limit = req.query.limit;
        const inventory = await myInventory({ user: `${userId}`, page, limit });
        res.json({
            message: 'get user inventory success',
            data: inventory,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getUserInventoryLatest(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const page = req.query.page;
        const limit = req.query.limit;
        const inventory = await myLatestInventory({
            user: `${userId}`,
            page,
            limit,
        });
        res.json({
            message: 'get user inventory success',
            data: inventory,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
