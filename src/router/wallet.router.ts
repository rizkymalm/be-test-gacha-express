import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import { getWallet } from '../controllers/wallet.controller.js';

const walletRouter = express.Router();

walletRouter.get('/amount', authenticateToken, getWallet);

export default walletRouter;
