import express from 'express';
import { authGet, postLogin, postRegister } from '../controllers/auth.controller.ts';
import { loginRules } from '../lib/userValidationRules.ts';

const authRouter = express.Router();

authRouter.get('/', authGet);
authRouter.post('/register', postRegister);
authRouter.post('/login', loginRules ,postLogin);

export default authRouter;
