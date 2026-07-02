import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .ts';
import { getWallet } from '../controllers/wallet.controller.ts';

const walletRouter = express.Router();

walletRouter.get('/amount', authenticateToken, getWallet);

export default walletRouter;
