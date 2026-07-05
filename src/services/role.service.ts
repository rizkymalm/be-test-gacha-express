import type { Types } from 'mongoose';
import roleModels from '../models/role.models.js';

interface PropRoleDetail {
    role: Types.ObjectId | string | string[];
}

export async function roleList() {
    const response = roleModels.find();
    return response.exec();
}

export async function roleDetail({ role }: PropRoleDetail) {
    const response = roleModels.findOne({ _id: role }).select('role');
    return response.exec();
}
