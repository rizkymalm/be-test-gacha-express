import type { Request, Response } from 'express';

export async function getEventItem(req: Request, res: Response) {
    try {
        const event = req.params.event;
        res.json({
            message: 'get Event Item success',
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function postUpdateEventItem(req: Request, res: Response) {
    try {
        const event = req.params.event;
        res.json({
            message: 'post Update Event Item success',
        });
    } catch (error) {
        res.status(404).json({
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
        res.json({
            message: 'get Event Item success',
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function deleteEventItem(req: Request, res: Response) {
    try {
        const event = req.params.event;
        res.json({
            message: 'get Event Item success',
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
