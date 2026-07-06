import type { Request, Response } from 'express';
import { weightedRandom } from '../utils/weightedRandom.js';
import mongoose, { Types } from 'mongoose';
import { walletGet, walletUpdateBalance } from '../services/wallet.service.js';
import {
    Description,
    ReferenceIdPrefix,
    ReferenceType,
} from '../constants/transaction.enum.js';
import { generateRefId } from '../utils/generateRefId.js';
import { bulkWriteInventory } from '../services/inventory.service.js';
import { groupItemGacha } from '../utils/groupItemGacha.js';
import transactionModels from '../models/transaction.model.js';
import historyModels from '../models/history.models.js';
import { checkEventActive } from '../services/event.service.ts';
import { itemDetail } from '../services/item.service.ts';

interface PropsShowItem {
    _id: Types.ObjectId | string | string[];
    name: string;
    image: string;
    tier: string;
}

export async function getRandomGacha(req: Request, res: Response) {
    const session = await mongoose.startSession();
    try {
        const userId = req.user?.id;
        const countQuery = req.query.count;
        if (!userId) return undefined;
        const count = countQuery ? parseInt(`${countQuery}`) : 1;
        let data: PropsShowItem[] = [];

        // 1. check balance
        const walletUser = await walletGet({ user: userId });
        if (walletUser && walletUser?.balance < 10 * count) {
            return res.status(402).json({
                status: 'Payment Required',
                errors: {
                    message: `Insufficient Balance`,
                },
            });
        } else {
            // 2. random gacha
            // check active event
            for (let i = 0; i < count; i++) {
                const random = await weightedRandom();
                const item = await itemDetail({ id: random.item });
                if (item) {
                    data.push(item);
                }
            }
            // 3. group reward item
            const group = await groupItemGacha(data);

            const transaction = data.map(() => ({
                wallet: walletUser?._id,
                amount: 10,
                description: Description.GACHA,
                referenceType: ReferenceType.GACHA,
                referenceId: generateRefId(ReferenceIdPrefix.GACHA),
                type: 'OUT',
            }));

            const history = data.map((item, index: number) => ({
                user: userId,
                item: item._id,
                wallet: walletUser?.id,
                referenceId: transaction[index]?.referenceId,
                cost: 10,
            }));
            await session.withTransaction(async () => {
                // 4. update wallet by ID
                if (!walletUser) return undefined;

                await walletUpdateBalance({
                    id: walletUser?._id,
                    balance: walletUser?.balance - 10 * count,
                    session,
                });
                // const refId = await generateRefId(ReferenceIdPrefix.GACHA);
                // 3. insert transaction history
                await transactionModels.insertMany(transaction, { session });
                // 4. update inventory
                await bulkWriteInventory({
                    data: group,
                    user: userId,
                    session: session,
                });

                // 5. insert gacha log/history
                await historyModels.insertMany(history, { session });
            });
            if (data) {
                res.json({
                    message: 'get random gacha success',
                    data: data,
                });
            }
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    } finally {
        await session.endSession();
    }
}
