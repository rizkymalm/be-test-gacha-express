import bcrypt from 'bcryptjs';
import 'dotenv/config';
import type { Request, Response } from 'express';
import { authLogin, authRegister } from '../services/auth.service.js';

import jwt, { type VerifyErrors } from 'jsonwebtoken';

import type { UserPayload } from '../types.js';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateAccessToken.js';
import { walletCreate } from '../services/wallet.service.js';
import { transactionCreate } from '../services/transaction.service.js';
import { Description, ReferenceType } from '../constants/transaction.enum.js';
import connectDB from '../config/db.js';

export async function authGet(req: Request, res: Response) {
    try {
        res.json({
            message: 'auth routes success',
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function postRegister(req: Request, res: Response) {
    try {
        const { username, password, email, firstName, lastName, role } =
            req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const auth = await authRegister({
            username,
            email,
            password: hashedPass,
            firstName,
            lastName,
            role,
        });

        const wallet = await walletCreate({
            user: auth._id,
            balance: 500,
        });

        await transactionCreate({
            wallet: wallet._id,
            amount: 500,
            type: 'IN',
            referenceType: ReferenceType.REGISTER,
            referenceId: '123',
            description: Description.REGISTER,
        });

        res.json({
            message: 'save user success',
            data: auth,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message || 'An error occurred during registration',
        });
    }
}

export async function postLogin(req: Request, res: Response) {
    try {
        await connectDB();
        const { email, password } = req.body;
        const login = await authLogin({ email });
        if (!login) {
            res.status(404).json({
                message: 'User not Found!',
            });
        } else {
            const decrypt = await bcrypt.compare(
                password,
                login?.password || ''
            );
            if (!decrypt) {
                res.status(404).json({
                    message: 'Password not match!',
                });
            } else {
                const payload = {
                    id: login._id,
                    username: login.username,
                    email: login.email,
                    role: login.role,
                };
                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken(payload);

                res.json({
                    message: 'Login user success',
                    data: {
                        token: {
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        },
                    },
                });
            }
        }
    } catch (error: any) {
        res.status(404).json({
            message: error.message || 'An error occurred during registration',
        });
    }
}

export async function postRefreshToken(req: Request, res: Response) {
    const refreshToken = req.headers['authorization'];
    const token = refreshToken && refreshToken.split(' ')[1];

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }

    jwt.verify(
        token!,
        process.env.REFRESH_TOKEN_SECRET!,
        async (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: 'Refresh token expired or tampered' });
            }

            try {
                const user: UserPayload = {
                    id: decoded.id,
                    username: decoded.username,
                    email: decoded.email,
                    role: decoded.role,
                };
                const newAccessToken = generateAccessToken(user);

                return res.json({
                    data: {
                        token: {
                            accessToken: newAccessToken,
                            refreshToken: token,
                        },
                    },
                });
            } catch (dbError) {
                return res
                    .status(500)
                    .json({ message: 'Internal server error' });
            }
        }
    );
}
