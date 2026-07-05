import express from 'express';
import {
    authGet,
    postRefreshToken,
    postLogin,
    postRegister,
} from '../controllers/auth.controller.js';
import { loginRules, registerRules } from '../lib/userValidationRules.js';

const authRouter = express.Router();

authRouter.get('/', authGet);
authRouter.post('/register', registerRules, postRegister);
authRouter.post('/login', loginRules, postLogin);
authRouter.post('/refresh-token', postRefreshToken);

export default authRouter;
