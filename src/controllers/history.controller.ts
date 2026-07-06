import type { Request, Response } from "express";
import { historyCount, historyList } from "../services/history.service.js";

export async function getHistoryList(req: Request, res: Response) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const item = await historyList({
            page,
            limit,
        });
        const totalData = await historyCount()
        res.json({
            message: 'get history success',
            data: item,
            totalData
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}