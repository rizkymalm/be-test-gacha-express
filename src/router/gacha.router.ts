import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .ts';
import { getRandomGacha } from '../controllers/gacha.controller.ts';

const gachaRouter = express.Router();

gachaRouter.get('/amount', authenticateToken, getRandomGacha);

export default gachaRouter;
