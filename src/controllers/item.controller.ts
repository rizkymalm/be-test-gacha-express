import type { Request, Response } from 'express';
import { itemGet, itemGroup } from '../services/item.service.ts';

export async function getItem(req: Request, res: Response) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;

        const item = await itemGet({
            page,
            limit,
        });
        res.json({
            message: 'get Item success',
            data: item,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getItemGroup(req: Request, res: Response) {
    try {
        const item = await itemGroup();
        res.json({
            message: 'get Item success',
            data: item,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
