import express from 'express';
import {
    authGet,
    postRefreshToken,
    postLogin,
    postRegister,
} from '../controllers/auth.controller.ts';
import { loginRules } from '../lib/userValidationRules.ts';

const authRouter = express.Router();

authRouter.get('/', authGet);
authRouter.post('/register', postRegister);
authRouter.post('/login', loginRules, postLogin);
authRouter.post('/refresh-token', postRefreshToken);

export default authRouter;
