import type { Types } from 'mongoose';
import { roleDetail } from '../services/role.service.ts';
import type { PropId } from '../types.js';

export async function isAdmin({ id }: PropId) {
    const role = await roleDetail({ role: id });
    const check = role?.role === 'ADMIN' ? true : false;
    return check;
}
