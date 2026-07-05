import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken .js';
import { getRoleDetail, getRoleList, getRoleLogin } from '../controllers/role.controller.js';

const roleRouter = express.Router();

roleRouter.get('/list', authenticateToken , getRoleList);
roleRouter.get('/login', authenticateToken , getRoleLogin);
roleRouter.get('/detail/:id', authenticateToken , getRoleDetail);

export default roleRouter;
