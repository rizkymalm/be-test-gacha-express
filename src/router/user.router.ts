import express from 'express';
import { getProfile, getUserInventory, getUserInventoryLatest } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/authenticateToken .js';

const userRouter = express.Router();

userRouter.get('/profile', authenticateToken , getProfile);
userRouter.get('/inventory', authenticateToken , getUserInventory);
userRouter.get('/inventory/latest', authenticateToken , getUserInventoryLatest);

export default userRouter;
