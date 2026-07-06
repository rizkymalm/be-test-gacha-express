import type { NextFunction, Request, Response } from "express";
import { isAdmin } from "../utils/isAdmin.ts";

export const validateAdminRole = async (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.user?.role
    const checkRole = await isAdmin({ id: roleId || '' });
    if (!checkRole) {
        res.status(403).json({
            status: 'Forbidden access!',
            errors: {
                message: 'Your access role is forbidden',
            },
        });
    }
    next();
};
