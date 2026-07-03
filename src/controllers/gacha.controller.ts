import type { Request, Response } from 'express';

export async function getRandomGacha(req: Request, res: Response) {
    try {
        res.json({
            message: 'get random gacha success',
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
