import type { Types } from 'mongoose';
import { roleDetail } from '../services/role.service.ts';

export async function isAdmin(id: Types.ObjectId) {
    const role = await roleDetail({ role: id });
    const check = role?.role === 'ADMIN' ? true : false;
    return check;
}
