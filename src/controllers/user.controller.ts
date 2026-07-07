import type { Request, Response } from 'express';
import {
    userCount,
    userDetail,
    userList,
    userProfile,
} from '../services/user.service.js';
import bcrypt from 'bcryptjs';
import {
    myInventory,
    myLatestInventory,
} from '../services/inventory.service.js';
import authModels from '../models/auth.model.js';
import generateRandomCharacter from '../utils/randomCharacter.js';
import mongoose from 'mongoose';
import walletModels from '../models/wallet.model.js';
import transactionModels from '../models/transaction.model.js';
import {
    Description,
    ReferenceIdPrefix,
    ReferenceType,
} from '../constants/transaction.enum.js';
import { generateRefId } from '../utils/generateRefId.js';
import { roleDetail } from '../services/role.service.js';

export async function getProfile(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const user = await userProfile({ id: userId });
        res.json({
            message: 'get profile success',
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getUserInventory(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const page = req.query.page;
        const limit = req.query.limit;
        const inventory = await myInventory({ user: `${userId}`, page, limit });
        res.json({
            message: 'get user inventory success',
            data: inventory,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getUserInventoryLatest(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        const page = req.query.page;
        const limit = req.query.limit;
        const inventory = await myLatestInventory({
            user: `${userId}`,
            page,
            limit,
        });
        res.json({
            message: 'get user inventory success',
            data: inventory,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function postCreateUser(req: Request, res: Response) {
    const session = await mongoose.startSession();
    try {
        const { username, firstName, lastName, email, role } = req.body;
        const password = generateRandomCharacter(12);
        const hashedPass = await bcrypt.hash(password, 10);
        const checkRole = await roleDetail({ role });

        const userData = {
            username,
            email,
            password: hashedPass,
            firstName,
            lastName,
            role,
        };

        if (!checkRole) {
            return res.status(422).json({
                status: 'Unprocessable Entity',
                errors: {
                    field: 'Role',
                    message: 'Role does not exist!',
                },
            });
        }

        await session.withTransaction(async () => {
            const user = new authModels(userData);
            const savedUser = await user.save({ session });

            const wallet = new walletModels({
                user: savedUser._id,
                balance: 500,
            });
            const savedWallet = await wallet.save({ session });

            const transaction = new transactionModels({
                wallet: savedWallet._id,
                amount: 500,
                type: 'IN',
                referenceType: ReferenceType.REGISTER,
                referenceId: generateRefId(ReferenceIdPrefix.REGISTER),
                description: Description.REGISTER,
            });

            await transaction.save({ session });
        });

        res.json({
            message: 'create new user success',
            data: {
                user: userData,
                password,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message || error,
        });
    } finally {
        await session.endSession();
    }
}

export async function getListUser(req: Request, res: Response) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const data = await userList({
            page,
            limit,
        });
        const totalData = await userCount();
        res.json({
            message: 'get user llist success',
            data,
            totalData,
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}

export async function getDetailUser(req: Request, res: Response) {
    try {
        const user = req.params.user;
        const data = await userDetail({ id: `${user}` });
        if (data.length === 0) {
            return res.status(404).json({
                status: 'NOT FOUND',
                errors: {
                    message: 'User does not exist',
                },
            });
        }
        res.json({
            message: 'get user detail success',
            data: data[0],
        });
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
}
