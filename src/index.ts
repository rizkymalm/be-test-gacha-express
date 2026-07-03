import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.ts';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router/index.ts';
import authRouter from './router/auth.router.ts';
import userRouter from './router/user.router.ts';
import cookieParser from 'cookie-parser';
import walletRouter from './router/wallet.router.ts';
import gachaRouter from './router/gacha.router.ts';
import itemRouter from './router/item.router.ts';
import roleRouter from './router/role.router.ts';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

app.use('', router);
app.use('/auth', authRouter);
app.use('/role', roleRouter)
app.use('/user', userRouter);
app.use('/wallet', walletRouter);
app.use('/gacha', gachaRouter);
app.use('/item', itemRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
