import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router/index.js';
import authRouter from './router/auth.router.js';
import userRouter from './router/user.router.js';
import cookieParser from 'cookie-parser';
import walletRouter from './router/wallet.router.js';
import gachaRouter from './router/gacha.router.js';
import itemRouter from './router/item.router.js';
import roleRouter from './router/role.router.js';
import eventRouter from './router/event.router.ts';
import eventItemRouter from './router/eventItem.router.ts';
import historyRouter from './router/history.router.ts';

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
app.use('/role', roleRouter);
app.use('/user', userRouter);
app.use('/wallet', walletRouter);
app.use('/gacha', gachaRouter);
app.use('/item', itemRouter);
app.use('/event', eventRouter);
app.use('/event-item', eventItemRouter);
app.use('/history', historyRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
