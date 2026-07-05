import type { Types } from 'mongoose';
import eventModels from '../models/event.model.ts';
import type { PropQueryList } from '../types/types.js';
import mongoose from 'mongoose';

interface PropsEventCreate {
    event: string;
    description: string;
    image?: string;
    status: 'ACTIVE' | 'INACTIVE';
}

export async function eventList({
    limit,
    page,
    status,
    search,
}: PropQueryList) {
    const data = eventModels.aggregate([
        {
            $match: {
                status: status ? status : { $ne: null },
                event: search ? new RegExp(search, 'i') : { $ne: null },
            },
        },
        {
            $limit: parseInt(limit),
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit),
        },
        {
            $sort: { createdAt: -1 },
        },
    ]);
    return data.exec();
}

export async function checkEventActive() {
    const data = eventModels.findOne({ status: 'ACTIVE' });
    return data.exec();
}

export async function detailEvent({
    id,
}: {
    id: string | Types.ObjectId;
}) {
    const data = eventModels.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
            $lookup: {
                from: 'items',
                localField: '_id',
                foreignField: 'event',
                as: 'items',
            },
        },
    ]);
    return data.exec();
}

export async function eventCreate({
    event,
    description,
    image,
    status,
}: PropsEventCreate) {
    const save = new eventModels({
        event,
        description,
        image,
        status,
    });

    return await save.save();
}
