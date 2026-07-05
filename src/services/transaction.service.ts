import type { Types } from 'mongoose';
import transactionModels from '../models/transaction.model.js';
import { ReferenceType } from '../constants/transaction.enum.js';

type Reference = keyof typeof ReferenceType;

interface PropTransaction {
    wallet: Types.ObjectId;
    type: 'IN' | 'OUT';
    amount: number;
    referenceType: Reference;
    referenceId: string;
    description: string;
}

export async function transactionCreate({
    wallet,
    type,
    amount,
    referenceType,
    referenceId,
    description,
}: PropTransaction) {
    const newTransaction = new transactionModels({
        wallet,
        type,
        amount,
        referenceType,
        referenceId,
        description,
    });

    return await newTransaction.save();
}

export async function transactionCreateMany({ data }: any) {
    const transaction = transactionModels.insertMany(data);
    return await transaction;
}
