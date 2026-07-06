import type { Types } from 'mongoose';
import inventoryModel from '../models/inventory.models.js';
import mongoose from 'mongoose';
import historyModels from '../models/history.models.js';

interface Props {
    user: Types.ObjectId | string | string[];
    item: Types.ObjectId | string | string[];
}

interface PropsMyInventory {
    user: Types.ObjectId | string;
    page: any;
    limit: any;
}

export async function myInventory({ user, page, limit }: PropsMyInventory) {
    const data = inventoryModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(user),
            },
        },
        {
            $lookup: {
                from: 'items',
                localField: 'item',
                foreignField: '_id',
                as: 'items',
            },
        },
        {
            $unwind: '$items',
        },
        {
            $addFields: {
                tierOrder: {
                    $indexOfArray: [
                        ['LEGENDARY', 'DIAMOND', 'GOLD', 'SILVER'],
                        '$items.tier',
                    ],
                },
            },
        },
        {
            $sort: {
                tierOrder: 1,
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

export async function myLatestInventory({ user, page, limit }: PropsMyInventory) {
    const data = historyModels.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(user),
            },
        },
        {
            $lookup: {
                from: 'items',
                localField: 'item',
                foreignField: '_id',
                as: 'items',
            },
        },
        {
            $unwind: '$items',
        },
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

export async function checkInventory({ user, item }: Props) {
    const data = inventoryModel.findOne({
        user,
        item,
    });
    return data.exec();
}

export async function insertInventory({ user, item }: Props) {
    const inventory = await inventoryModel
        .findOne({
            user,
            item,
        })
        .exec();
    if (!inventory) {
        const save = new inventoryModel({
            user,
            item,
            quantity: 1,
        });
        return await save.save();
    } else {
        const update = inventoryModel.updateOne(
            { _id: inventory._id },
            { $inc: { quantity: 1 } }
        );
        update.exec();
        return inventory;
    }
}

export async function bulkWriteInventory({ data, user, session }: any) {
    let updateInventory = [];
    for (let i = 0; i < data.length; i++) {
        updateInventory.push({
            updateOne: {
                filter: {
                    user: user,
                    item: data[i]._id,
                },
                update: {
                    $inc: {
                        quantity: data[i].quantity,
                    },
                },
                upsert: true,
            },
        });
    }

    const update = inventoryModel.bulkWrite(updateInventory, { session });
    return update;
}
