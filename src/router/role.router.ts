import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .ts';
import { getRoleDetail, getRoleList, getRoleLogin } from '../controllers/role.controller.ts';

const roleRouter = express.Router();

roleRouter.get('/list', authenticateToken , getRoleList);
roleRouter.get('/login', authenticateToken , getRoleLogin);
roleRouter.get('/detail/:id', authenticateToken , getRoleDetail);

export default roleRouter;
