import type { Request, Response } from 'express';
import {
    itemDetail,
    itemGet,
    itemGroup,
    itemSoftDelete,
} from '../services/item.service.js';
import { checkEventActive } from '../services/event.service.ts';
import itemModels from '../models/item.models.ts';
import { eventItemList } from '../services/eventItem.service.ts';

export async function getItemList(req: Request, res: Response) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const item = await itemGet({
            page,
            limit,
        });
        res.json({
            message: 'get Item success',
            data: item,
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}

export async function getItemGroup(req: Request, res: Response) {
    try {
        const checkEvent = await checkEventActive();
        if (checkEvent) {
            const eventItems = await eventItemList({ event: checkEvent._id });
            const arrayItems = eventItems.map((item: any) => {
                return item.item;
            });
            const item = await itemGroup(arrayItems);
            res.json({
                message: 'get Item success',
                data: item,
            });
        } else {
            res.status(404).json({
                status: 'NOT FOUND!',
                errors: {
                    message: 'No Active event',
                },
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}

export async function postCreateItem(req: Request, res: Response) {
    try {
        const { name, image, tier } = req.body;

        const data = new itemModels({
            name,
            image,
            tier,
        });
        data.save().then(result => {
            res.json({
                message: 'create Item success',
                data: result,
            });
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}

export async function putUpdateItem(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const { name, image, tier } = req.body;

        const selectedItem = await itemDetail({ id: id || '' });
        if (selectedItem) {
            await itemModels
                .updateOne(
                    { _id: id },
                    {
                        name,
                        image,
                        tier,
                    }
                )
                .exec()
                .then(result => {
                    res.json({
                        message: 'Update Item success',
                        data: result,
                    });
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
        res.status(400).json({
            message: error,
        });
    }
}

export async function deleteItem(req: Request, res: Response) {
    try {
        const id = req.params.id;

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
        res.status(400).json({
            message: error,
        });
    }
}
