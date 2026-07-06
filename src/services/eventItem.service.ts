import type { Types } from 'mongoose';
import eventItemModels from '../models/eventItem.models.js';
import mongoose from 'mongoose';

interface Props {
    event: string | Types.ObjectId | string[];
}
interface PropSelected {
    event: string | Types.ObjectId | string[];
    item: string | Types.ObjectId | string[];
}
interface PropEdit {
    id: string | Types.ObjectId | string[];
    event: string | Types.ObjectId | string[];
}
export async function eventItemList({ event }: Props) {
    const data = eventItemModels.aggregate([
        {
            $match: {
                event: new mongoose.Types.ObjectId(`${event}`),
            },
        },
        {
            $unset: ['createdAt', 'updatedAt'],
        },
    ]);
    return await data.exec();
}

export async function eventItemSelected({ event, item }: PropSelected) {
    const data = eventItemModels.findOne({ event, item });
    return await data.exec();
}
export async function eventItemSelectedById({
    id,
}: {
    id: string | Types.ObjectId | string[];
}) {
    const data = eventItemModels.findOne({ _id: id });
    return await data.exec();
}

export async function sumEventItemDropRate({ event }: Props) {
    const item = eventItemModels.aggregate([
        {
            $match: {
                event: new mongoose.Types.ObjectId(`${event}`),
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$dropRate' },
            },
        },
    ]);
    return await item.exec();
}

export async function sumEventItemDropRateExclude({ id, event }: PropEdit) {
    const item = eventItemModels.aggregate([
        {
            $match: {
                event: new mongoose.Types.ObjectId(`${event}`),
                _id: { $nin: [new mongoose.Types.ObjectId(`${id}`)] },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$dropRate' },
            },
        },
    ]);
    return await item.exec();
}
