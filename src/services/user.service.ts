import mongoose, { Types } from 'mongoose';
import authModels from '../models/auth.model.js';

interface PropsGetWithPagination {
    page: any;
    limit: any;
}

interface PropsUserDetail {
    id: Types.ObjectId | string
}

export async function userProfile({ id }: any) {
    const data = authModels
        .findOne({ _id: id })
        .select('username email firstName lastName role');
    return data.exec();
}

export async function userList({ page, limit }: PropsGetWithPagination) {
    const data = authModels.aggregate([
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'role',
                foreignField: '_id',
                as: 'roles',
            },
        },
        {
            $unwind: '$roles',
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

export async function userDetail({ id }: PropsUserDetail) {
    const data = authModels.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'role',
                foreignField: '_id',
                as: 'roles',
            },
        },
        {
            $unwind: '$roles',
        },
    ]);
    return data.exec();
}

export async function userCount() {
    const data = authModels.countDocuments();
    return data;
}
