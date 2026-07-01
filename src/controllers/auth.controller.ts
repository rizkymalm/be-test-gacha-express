import bcrypt from 'bcryptjs';
import 'dotenv/config';
import type { Request, Response } from 'express';
import { authLogin, authRegister } from '../services/auth.service.ts';

import pkg from 'jsonwebtoken';
const { sign } = pkg;

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
        const save = await authRegister({
            username,
            email,
            password: hashedPass,
            firstName,
            lastName,
            role,
        });

        res.json({
            message: 'save user success',
            data: save,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message || 'An error occurred during registration',
        });
    }
}

export async function postLogin(req: Request, res: Response) {
    try {
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
                const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
                const payload = {
                    id: login._id,
                    username: login.username,
                    email: login.email,
                    role: login.role,
                };
                const accessToken = sign(payload, accessTokenSecret || '', {
                    expiresIn: '15m',
                });

                res.json({
                    message: 'Login user success',
                    data: login,
                    accessToken: accessToken,
                });
            }
        }
    } catch (error: any) {
        res.status(404).json({
            message: error.message || 'An error occurred during registration',
        });
    }
}
