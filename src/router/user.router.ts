import express from 'express';
import { getProfile } from '../controllers/user.controller.ts';
import { authenticateToken } from '../middleware/authenticateToken .ts';

const userRouter = express.Router();

userRouter.get('/profile', authenticateToken , getProfile);

export default userRouter;
