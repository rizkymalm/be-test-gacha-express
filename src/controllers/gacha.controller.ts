import type { Request, Response } from 'express';
import { weightedRandom } from '../utils/weightedRandom.ts';
import mongoose from 'mongoose';
import { walletGet, walletUpdateBalance } from '../services/wallet.service.ts';
import { transactionCreate } from '../services/transaction.service.ts';
import {
    Description,
    ReferenceIdPrefix,
    ReferenceType,
} from '../constants/transaction.enum.ts';
import { generateRefId } from '../utils/generateRefId.ts';
import { insertInventory } from '../services/inventory.service.ts';
import { historyCreate } from '../services/history.service.ts';

export async function getRandomGacha(req: Request, res: Response) {
    const session = await mongoose.startSession();
    try {
        const userId = req.user?.id;
        if (!userId) return undefined;
        const random = await weightedRandom();

        // 1. check balance
        const walletUser = await walletGet({ user: userId });
        if (walletUser && walletUser?.balance < 10) {
            return res.status(402).json({
                status: 'Payment Required',
                errors: {
                    message: `Insufficient Balance`,
                },
            });
        }

        await session.withTransaction(async () => {
            // 2. update wallet by ID
            if (!walletUser) return undefined;

            await walletUpdateBalance({
                id: walletUser?._id,
                balance: walletUser?.balance - 10,
            });
            const refId = await generateRefId(ReferenceIdPrefix.GACHA);
            // 3. insert transaction history
            const transaction = await transactionCreate({
                wallet: walletUser?._id,
                amount: 10,
                description: Description.GACHA,
                referenceType: ReferenceType.GACHA,
                referenceId: refId,
                type: 'OUT',
            });
            // 4. update inventory
            const inventory = await insertInventory({
                item: random._id,
                user: userId,
            });
            // 5. insert gacha log/history
            await historyCreate({
                user: userId,
                item: random._id,
                wallet: walletUser.id,
                transaction: transaction._id,
                inventory: inventory._id,
                cost: 10,
            });
        });
        if (random) {
            res.json({
                message: 'get random gacha success',
                data: random,
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    } finally {
        await session.endSession();
    }
}
