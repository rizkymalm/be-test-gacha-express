import type { Request, Response } from 'express';
import { roleDetail, roleList } from '../services/role.service.js';
import { isAdmin } from '../utils/isAdmin.js';

export async function getRoleList(req: Request, res: Response) {
    try {
        const data = await roleList();
        res.json({
            message: 'get role success',
            data,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getRoleDetail(req: Request, res: Response) {
    try {
        const id = req.params.id;

        const data = await roleDetail({ role: id! });
        res.json({
            message: 'get role success',
            data,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getRoleLogin(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const roleId = req.user?.role;

        if (!userId || !roleId) {
            return res.status(404).json({
                status: 'NOT FOUND',
                errors: {
                    message: 'Role not found',
                },
            });
        }
        const data = await roleDetail({ role: roleId });
        res.json({
            message: 'get role detail success',
            data,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
