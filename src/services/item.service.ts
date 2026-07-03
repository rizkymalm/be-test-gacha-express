import type { Types } from 'mongoose';
import walletModels from '../models/wallet.model.ts';
import itemModels from '../models/item.models.ts';

interface PropItemGet {
    limit: any;
    page: any;
}

export async function itemGet({ limit, page }: PropItemGet) {
    const wallet = itemModels.aggregate([
        {
            $limit: parseInt(limit),
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit),
        },
    ]);
    return wallet.exec();
}

export async function itemGroup() {
    const wallet = itemModels.aggregate([
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
