import mongoose, { Schema } from 'mongoose';
import { ReferenceType } from '../constants/transaction.enum.js';

const transactionSchema = new mongoose.Schema(
    {
        wallet: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        type: {
            type: String,
            enum: ['IN', 'OUT'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        referenceType: {
            type: String,
            required: true,
            enum: ReferenceType
        },
        referenceId: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const transactionModels = mongoose.model('Transaction', transactionSchema);

export default transactionModels;
