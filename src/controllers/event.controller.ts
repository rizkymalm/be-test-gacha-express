import type { Request, Response } from 'express';
import {
    checkEventActive,
    detailEvent,
    eventCreate,
    eventList,
} from '../services/event.service.js';
import { isAdmin } from '../utils/isAdmin.js';
import eventModels from '../models/event.model.js';
import {
    itemDetail,
    itemExcludeGet,
    itemGet,
} from '../services/item.service.js';
import itemModels from '../models/item.models.js';
import mongoose from 'mongoose';
import { eventItemList } from '../services/eventItem.service.ts';

export async function getListEvent(req: Request, res: Response) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const status = `${req.query.status}`;
        const search = `${req.query.search}`;

        const item = await eventList({
            page,
            limit,
            status:
                status === 'ACTIVE' || status === 'INACTIVE'
                    ? status
                    : undefined,
            search: search === 'undefined' ? undefined : search,
        });
        res.json({
            message: 'get event success',
            data: item,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getActiveEvent(req: Request, res: Response) {
    try {
        const data = await checkEventActive();
        res.json({
            message: 'get event success',
            data,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getDetailEvent(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const roleId = req.user?.role;
        const checkRole = await isAdmin({ id: roleId || '' });
        if (!checkRole) {
            res.status(403).json({
                status: 'Forbidden access!',
                errors: {
                    message: 'Your access role is forbidden',
                },
            });
        }
        const data = await detailEvent({ id: `${id}` || '' });
        if (data.length > 0) {
            res.json({
                message: 'get detail event success',
                data: data[0],
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getEventItemExclude(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const page = req.query.page;
        const limit = req.query.limit;

        const data = await eventItemList({ event: id || '' });
        const arrayItems = data.map((item: any) => {
            return item.item;
        });
        const result = await itemExcludeGet({
            page,
            limit,
            items: arrayItems,
        });
        res.json({
            message: 'get item event exclude success',
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function postCreateEvent(req: Request, res: Response) {
    try {
        const { event, description, image, status } = req.body;
        if (status === 'ACTIVE') {
            const checkEvent = await checkEventActive();
            if (checkEvent) {
                await eventModels.updateOne(
                    { _id: checkEvent._id },
                    { status: 'INACTIVE' }
                );
            }
        }
        const data = await eventCreate({
            event,
            description,
            image,
            status,
        });
        res.json({
            message: 'create event success',
            data: data,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function patchUpdateStatusEvent(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const { status } = req.body;
        if (status === 'ACTIVE') {
            const checkEvent = await checkEventActive();
            if (checkEvent) {
                await eventModels.updateOne(
                    { _id: checkEvent._id },
                    { status: 'INACTIVE' }
                );
            }
        }
        await eventModels
            .updateOne(
                {
                    _id: id,
                },
                {
                    status: status,
                }
            )
            .exec();

        res.json({
            message: 'update status event success',
            data: id,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function putEditEvent(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const { event, description, image, status } = req.body;

        if (status === 'ACTIVE') {
            const checkEvent = await checkEventActive();
            if (checkEvent) {
                await eventModels.updateOne(
                    { _id: checkEvent._id },
                    { status: 'INACTIVE' }
                );
            }
        }
        await eventModels.updateOne(
            { _id: id },
            {
                event,
                description,
                image,
                status,
            }
        );
        res.json({
            message: 'edit event success',
            data: {
                id,
                event,
                description,
                image,
                status,
            },
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

// export async function patchUpdateItemEvent(req: Request, res: Response) {
//     try {
//         const id = req.params.id;
//         const { items } = req.body;

//         for (let i = 0; i < items.length; i++) {
//             const item = await itemDetail({ id: items[i] });
//             if (item) {
//                 let eventItem: any = item?.event || [];
//                 const eventId: string | string[] = id || '';
//                 eventItem.push(eventId);
//                 await itemModels.updateOne(
//                     { _id: item.id },
//                     { event: eventItem }
//                 );
//             }
//         }

//         res.json({
//             message: 'update item event success',
//             data: items,
//         });
//     } catch (error) {
//         res.status(404).json({
//             message: error,
//         });
//     }
// }
