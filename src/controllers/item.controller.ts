import type { Request, Response } from 'express';
import {
    itemCreate,
    itemDetail,
    itemEditDropRate,
    itemGet,
    itemGroup,
    itemSoftDelete,
    itemUpdate,
    sumItemDropRate,
} from '../services/item.service.js';
import { isAdmin } from '../utils/isAdmin.js';
import { checkEventActive } from '../services/event.service.ts';

export async function getItem(req: Request, res: Response) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const checkEvent = await checkEventActive();
        if (checkEvent) {
            const item = await itemGet({
                page,
                limit,
                event: checkEvent._id,
            });
            res.json({
                message: 'get Item success',
                data: item,
            });
        } else {
            res.json({
                message: 'No Active event',
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getItemGroup(req: Request, res: Response) {
    try {
        const checkEvent = await checkEventActive();
        if (checkEvent) {
            const item = await itemGroup(checkEvent._id);
            res.json({
                message: 'get Item success',
                data: item,
            });

            res.json({
                message: 'get Item success',
                data: item,
            });
        } else {
            res.json({
                message: 'No Active event',
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function postCreateItem(req: Request, res: Response) {
    try {
        const roleId = req.user?.role;
        const { name, image, tier, dropRate } = req.body;

        const checkRole = await isAdmin({ id: roleId || '' });
        if (!checkRole) {
            res.status(403).json({
                status: 'Forbidden access!',
                errors: {
                    message: 'Your access role is forbidden',
                },
            });
        }

        const checkSum: any[] = await sumItemDropRate();
        const total = checkSum[0]?.total || 0;
        if (total + dropRate > 100) {
            return res.status(422).json({
                status: 'Unprocessable Entity',
                errors: {
                    field: 'dropRate',
                    message: `Total of drop rate must be within 100%`,
                },
            });
        } else {
            const data = await itemCreate({
                name,
                image,
                tier,
                dropRate,
            });
            res.json({
                message: 'create Item success',
                data,
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function putUpdateItem(req: Request, res: Response) {
    try {
        const roleId = req.user?.role;
        const id = req.params.id;
        const { name, image, tier, dropRate } = req.body;

        const checkRole = await isAdmin({ id: roleId || '' });
        if (!checkRole) {
            res.status(403).json({
                status: 'Forbidden access!',
                errors: {
                    message: 'Your access role is forbidden',
                },
            });
        }

        const selectedItem = await itemDetail({ id: id || '' });
        if (selectedItem) {
            const checkSum: any[] = await sumItemDropRate();
            const total = (checkSum[0]?.total || 0) - selectedItem.dropRate;
            if (total + dropRate > 100) {
                return res.status(422).json({
                    status: 'Unprocessable Entity',
                    errors: {
                        field: 'dropRate',
                        message: `Total of drop rate must be within 100%`,
                    },
                });
            } else {
                const data = await itemUpdate({
                    id: id || '',
                    name,
                    image,
                    tier,
                    dropRate,
                });
                res.json({
                    message: 'Update Item success',
                    data,
                });
            }
        } else {
            return res.status(404).json({
                status: 'Not found!',
                errors: {
                    message: `Item not found!`,
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function patchEditDropRate(req: Request, res: Response) {
    try {
        const roleId = req.user?.role;
        const id = req.params.id;
        const { tier, dropRate } = req.body;

        const checkRole = await isAdmin({ id: roleId || '' });
        if (!checkRole) {
            res.status(403).json({
                status: 'Forbidden access!',
                errors: {
                    message: 'Your access role is forbidden',
                },
            });
        }

        const selectedItem = await itemDetail({ id: id || '' });
        if (selectedItem) {
            const checkSum: any[] = await sumItemDropRate();
            const total = (checkSum[0]?.total || 0) - selectedItem.dropRate;
            if (total + dropRate > 100) {
                return res.status(422).json({
                    status: 'Unprocessable Entity',
                    errors: {
                        field: 'dropRate',
                        message: `Total of drop rate must be within 100%`,
                    },
                });
            } else {
                const data = await itemEditDropRate({
                    id: id || '',
                    tier,
                    dropRate,
                });
                res.json({
                    message: 'Edit Drop Rate Item success',
                    data,
                });
            }
        } else {
            return res.status(404).json({
                status: 'Not found!',
                errors: {
                    message: `Item not found!`,
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function deleteItem(req: Request, res: Response) {
    try {
        const roleId = req.user?.role;
        const id = req.params.id;

        const checkRole = await isAdmin({ id: roleId || '' });
        if (!checkRole) {
            res.status(403).json({
                status: 'Forbidden access!',
                errors: {
                    message: 'Your access role is forbidden',
                },
            });
        }

        const selectedItem = await itemDetail({ id: id || '' });
        if (selectedItem) {
            const data = await itemSoftDelete({
                id: id || '',
            });
            res.json({
                message: 'Delete Item success',
                data,
            });
        } else {
            return res.status(404).json({
                status: 'Not found!',
                errors: {
                    message: `Item not found!`,
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
