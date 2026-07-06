import type { Request, Response } from 'express';
import {
    eventItemList,
    eventItemSelected,
    eventItemSelectedById,
    sumEventItemDropRate,
    sumEventItemDropRateExclude,
} from '../services/eventItem.service.ts';
import eventItemModels from '../models/eventItem.models.ts';
import mongoose from 'mongoose';
import { itemDetail } from '../services/item.service.ts';
import { detailEvent } from '../services/event.service.ts';

export async function getEventItem(req: Request, res: Response) {
    try {
        const event = req.params.event;
        const data = await eventItemList({ event: event || '' });

        res.json({
            message: 'get Event Item success',
            data,
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}

export async function postAddEventItem(req: Request, res: Response) {
    try {
        const event = req.params.event;
        const { item, dropRate } = req.body;

        const checkSum: any[] = await sumEventItemDropRate({
            event: event || '',
        });
        const total = checkSum[0]?.total || 0;
        const sum = total + parseInt(dropRate);
        if (sum > 100) {
            return res.status(422).json({
                status: 'Unprocessable Entity',
                errors: {
                    field: 'dropRate',
                    message: `Total of drop rate must be within 100%`,
                },
            });
        } else {
            const checkItem = await itemDetail({ id: item });
            const checkEvent = await detailEvent({
                id: new mongoose.Types.ObjectId(`${event}`),
            });
            if (!checkItem || checkEvent.length === 0) {
                res.status(404).json({
                    status: 'Not Found',
                    errors: {
                        message: 'Data not found',
                    },
                });
            } else {
                if (event) {
                    const checkEventItem = await eventItemSelected({
                        event,
                        item,
                    });
                    if (checkEventItem) {
                        res.status(403).json({
                            status: 'Duplicate data',
                            errors: {
                                message: 'Item already exist',
                            },
                        });
                    } else {
                        await eventItemModels
                            .insertOne({
                                event: new mongoose.Types.ObjectId(`${event}`),
                                item,
                                dropRate,
                            })
                            .then(result => {
                                res.json({
                                    message: 'Add Event Item success',
                                    data: result,
                                });
                            });
                    }
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}

export async function patchUpdateDropRateEventItem(
    req: Request,
    res: Response
) {
    try {
        const event = req.params.event;
        const { id, dropRate } = req.body;
        const checkSum: any[] = await sumEventItemDropRateExclude({
            event: event || '',
            id: id || '',
        });
        const total = checkSum[0]?.total || 0;
        const sum = total + parseInt(dropRate);
        if (sum > 100) {
            return res.status(422).json({
                status: 'Unprocessable Entity',
                errors: {
                    field: 'dropRate',
                    message: `Total of drop rate must be within 100%`,
                },
            });
        } else {
            const checkEvent = await detailEvent({
                id: new mongoose.Types.ObjectId(`${event}`),
            });
            if (checkEvent.length === 0) {
                res.status(404).json({
                    status: 'Not Found',
                    errors: {
                        message: 'Event data not found',
                    },
                });
            } else {
                const checkEventItem = await eventItemSelectedById({ id });
                if (checkEventItem) {
                    await eventItemModels
                        .updateOne(
                            {
                                _id: new mongoose.Types.ObjectId(id),
                            },
                            { dropRate }
                        )
                        .then(result => {
                            res.json({
                                message: 'Update Drop Rate Item success',
                                data: result,
                            });
                        });
                } else {
                    res.status(404).json({
                        status: 'Not Found',
                        errors: {
                            message: 'Event Item data not found',
                        },
                    });
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}

export async function deleteEventItem(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const checkEventItem = await eventItemSelectedById({ id: id || '' });
        if (checkEventItem) {
            await eventItemModels
                .deleteOne({
                    _id: id,
                })
                .then(result => {
                    res.json({
                        message: 'Delete Event Item success',
                        data: result,
                    });
                });
        } else {
            res.status(404).json({
                status: 'Not Found',
                errors: {
                    message: 'Event Item data not found',
                },
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}
