import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import { getRandomGacha } from '../controllers/gacha.controller.js';

const gachaRouter = express.Router();

gachaRouter.get('/random', authenticateToken, getRandomGacha);

export default gachaRouter;
