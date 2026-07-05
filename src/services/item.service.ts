import type { Types } from 'mongoose';
import itemModels from '../models/item.models.js';
import type {
    PropsItemCreate,
    PropsItemEditDropRate,
    PropsItemUpdate,
} from '../types/item.type.js';
import type { PropId } from '../types.js';
import type { PropQueryList } from '../types/types.js';

export async function itemGet({ limit, page, event }: PropQueryList) {
    const wallet = itemModels.aggregate([
        {
            $match: {
                isDelete: { $ne: true },
                event: { $in: [event] },
            },
        },
        {
            $unset: ['createdAt', 'updatedAt'],
        },
        {
            $limit: parseInt(limit),
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit),
        },
    ]);
    return wallet.exec();
}

export async function itemExcludeGet({ limit, page, items }: PropQueryList) {
    console.log(limit, page)
    const result = itemModels.aggregate([
        {
            $match: {
                isDelete: { $ne: true },
                _id: { $nin: items },
            },
        },
        {
            $unset: ['createdAt', 'updatedAt'],
        },
        {
            $limit: parseInt(limit),
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit),
        },
    ]);
    return result.exec();
}

export async function itemDetail({ id }: PropId) {
    const wallet = itemModels.findOne({ _id: id, isDelete: { $ne: true } });
    return wallet.exec();
}

export async function itemCheckExist({ id }: PropId) {
    const item = itemModels.exists({ _id: id, isDelete: { $ne: true } });
    return item.exec();
}

export async function itemGroup(event: string | Types.ObjectId) {
    const wallet = itemModels.aggregate([
        {
            $match: {
                isDelete: { $ne: true },
                event: { $in: [event] },
            },
        },
        {
            $group: {
                _id: '$tier',
                docs: { $push: '$$ROOT' },
            },
        },
        {
            $project: {
                docs: {
                    $slice: [
                        '$docs',
                        {
                            $switch: {
                                branches: [
                                    {
                                        case: { $eq: ['$_id', 'SILVER'] },
                                        then: 2,
                                    },
                                    {
                                        case: { $eq: ['$_id', 'DIAMOND'] },
                                        then: 2,
                                    },
                                    {
                                        case: { $eq: ['$_id', 'LEGENDARY'] },
                                        then: 1,
                                    },
                                    {
                                        case: { $eq: ['$_id', 'GOLD'] },
                                        then: 2,
                                    },
                                ],
                                default: 0,
                            },
                        },
                    ],
                },
            },
        },
        {
            $unwind: '$docs',
        },
        {
            $replaceRoot: {
                newRoot: '$docs',
            },
        },
        {
            $addFields: {
                sortOrder: {
                    $indexOfArray: [
                        ['LEGENDARY', 'DIAMOND', 'GOLD', 'SILVER'],
                        '$tier', // Matches the tier field inside the newly restored root document
                    ],
                },
            },
        },
        {
            $sort: { sortOrder: 1 }, // Sorts 0, 1, 2, 3
        },
        {
            $project: { sortOrder: 0 }, // Cleans up the helper field from final output
        },
    ]);
    return wallet.exec();
}

export async function sumItemDropRate() {
    const item = itemModels.aggregate([
        {
            $match: {
                isDelete: { $ne: true },
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

export async function itemCreate({
    name,
    image,
    tier,
    dropRate,
}: PropsItemCreate) {
    const save = new itemModels({
        name,
        image,
        tier,
        dropRate,
    });

    return await save.save();
}

export async function itemUpdate({
    id,
    name,
    image,
    tier,
    dropRate,
}: PropsItemUpdate) {
    const update = itemModels.updateOne(
        { _id: id },
        {
            name,
            image,
            tier,
            dropRate,
        }
    );

    return await update.exec();
}

export async function itemEditDropRate({
    id,
    tier,
    dropRate,
}: PropsItemEditDropRate) {
    const update = itemModels.updateOne(
        { _id: id },
        {
            $set: {
                tier: tier,
                dropRate: dropRate,
            },
        }
    );

    return await update.exec();
}

export async function itemSoftDelete({ id }: PropId) {
    const update = itemModels.updateOne(
        { _id: id },
        {
            $set: {
                isDelete: true,
            },
        }
    );

    return await update.exec();
}
