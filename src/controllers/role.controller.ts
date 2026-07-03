import type { Request, Response } from 'express';
import { roleDetail, roleList } from '../services/role.service.ts';
import { isAdmin } from '../utils/isAdmin.ts';

export async function getRoleList(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const roleId = req.user?.role;

        if (!userId || !roleId) return undefined;

        const checkRole = await isAdmin({ id: roleId || '' });
        if (checkRole) {
            const data = await roleList();
            res.json({
                message: 'get role success',
                data,
            });
        } else {
            res.status(403).json({
                message: 'Forbidden access!',
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getRoleDetail(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const roleId = req.user?.role;
        const id = req.params.id;

        if (!userId || !roleId) return undefined;

        const checkRole = await isAdmin({ id: roleId || '' });
        if (checkRole) {
            const data = await roleDetail({ role: id! });
            res.json({
                message: 'get role success',
                data,
            });
        } else {
            res.status(403).json({
                message: 'Forbidden access!',
            });
        }
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

        if (!userId || !roleId) return undefined;
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
