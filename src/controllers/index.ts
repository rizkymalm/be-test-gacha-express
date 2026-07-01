import type { Response } from 'express';

export async function getIndex(_: any, res: Response) {
    try {
        res.json({
            message: 'success',
        });
    } catch (error) {
        res.json({
            message: 'error',
        });
    }
}
