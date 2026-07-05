import express from 'express';
import { getProfile } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/authenticateToken .js';

const userRouter = express.Router();

userRouter.get('/profile', authenticateToken , getProfile);

export default userRouter;
