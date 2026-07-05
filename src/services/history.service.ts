import type { Types } from 'mongoose';
import historyModels from '../models/history.models.js';

interface Props {
    user: Types.ObjectId | string | string[];
    item: Types.ObjectId | string | string[];
    wallet: Types.ObjectId | string | string[];
    transaction: Types.ObjectId | string | string[];
    inventory: Types.ObjectId | string | string[];
    cost: number;
}

export async function historyCreate({
    user,
    item,
    wallet,
    transaction,
    inventory,
    cost,
}: Props) {
    const save = new historyModels({
        user,
        item,
        wallet,
        transaction,
        inventory,
        cost,
    });

    return await save.save();
}
