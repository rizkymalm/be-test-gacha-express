import type { NextFunction, Request, Response } from 'express';
import { dropRateRange } from '../utils/dropRateRange.js';
import { dropRateMax, TierType } from '../constants/item.constant.js';
import type { PropsTierRange } from '../types/item.type.js';
import itemModels from '../models/item.models.js';
import eventItemModels from '../models/eventItem.models.js';

export const validateDropRateEventItem = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { item, dropRate } = req.body;
    const detailItem = await itemModels.findOne({ _id: item }).exec();
    if (detailItem) {
        const index = dropRateMax.findIndex(
            (item: PropsTierRange) => item.tier === detailItem.tier
        );
        const min = dropRateMax[index]?.min || 0;
        const max = dropRateMax[index]?.max || 0;
        const check = dropRateRange({
            tier: TierType[detailItem.tier],
            value: parseInt(dropRate),
        });
        if (!check) {
            return res.status(422).json({
                status: 'Unprocessable Entity',
                errors: {
                    field: 'dropRate',
                    message: `Drop rate range must between ${min}% - ${max}%`,
                },
            });
        }
    }

    next();
};

export const validateDropRateEventItemUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id, dropRate } = req.body;
    const detailEventItem = await eventItemModels.findOne({ _id: id }).exec();
    if (detailEventItem) {
        const detailItem = await itemModels
            .findOne({ _id: detailEventItem.item })
            .exec();
        if (detailItem) {
            const index = dropRateMax.findIndex(
                (item: PropsTierRange) => item.tier === detailItem.tier
            );
            const min = dropRateMax[index]?.min || 0;
            const max = dropRateMax[index]?.max || 0;
            const check = dropRateRange({
                tier: TierType[detailItem.tier],
                value: parseInt(dropRate),
            });
            if (!check) {
                return res.status(422).json({
                    status: 'Unprocessable Entity',
                    errors: {
                        field: 'dropRate',
                        message: `Drop rate range must between ${min}% - ${max}%`,
                    },
                });
            }
        }
    }

    next();
};
