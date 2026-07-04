import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .ts';
import { getRandomGacha } from '../controllers/gacha.controller.ts';

const gachaRouter = express.Router();

gachaRouter.get('/random', authenticateToken, getRandomGacha);

export default gachaRouter;
