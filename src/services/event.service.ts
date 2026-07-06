import type { Types } from 'mongoose';
import eventModels from '../models/event.model.js';
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
            $limit: parseInt(limit),
        },
    ]);
    return data.exec();
}

export async function eventCount(){
    const data = eventModels.countDocuments();
    return data;
}

export async function checkEventActive() {
    const data = eventModels.findOne({ status: 'ACTIVE' });
    return data.exec();
}

export async function detailEvent({ id }: { id: string | Types.ObjectId }) {
    const data = eventModels.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
            $lookup: {
                from: 'eventitems',
                localField: '_id',
                foreignField: 'event',
                as: 'eventItems',
            },
        },
        {
            $lookup: {
                from: 'items',
                localField: 'eventItems.item', // Mengambil array ID item dari hasil lookup sebelumnya
                foreignField: '_id',
                as: 'itemsDetails',
            },
        },
        {
            $project: {
                event: 1,
                description: 1,
                status: 1,
                items: {
                    $map: {
                        input: '$eventItems',
                        as: 'ei',
                        in: {
                            dropRate: '$$ei.dropRate',
                            _id: '$$ei._id',
                            // Mencari detail item yang sesuai dengan ID di eventItems
                            details: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: '$itemsDetails',
                                            as: 'id',
                                            cond: {
                                                $eq: ['$$id._id', '$$ei.item'],
                                            },
                                        },
                                    },
                                    0,
                                ],
                            },
                        },
                    },
                },
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
