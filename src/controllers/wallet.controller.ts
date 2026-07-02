import type { Request, Response } from 'express';
import { walletGet } from '../services/wallet.service.ts';

export async function getWallet(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) return undefined;

        const wallet = await walletGet({ user: userId });
        res.json({
            message: 'get wallet success',
            data: wallet,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
