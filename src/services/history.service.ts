import type { Types } from 'mongoose';
import historyModels from '../models/history.models.js';
import type { PropQueryList } from '../types/types.js';

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

export async function historyList({ limit, page }: PropQueryList) {
    const data = historyModels.aggregate([
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit),
        },
        {
            $limit: parseInt(limit),
        },
    ]);
    return data.exec();
}

export async function historyCount(){
    const data = historyModels.countDocuments();
    return data;
}