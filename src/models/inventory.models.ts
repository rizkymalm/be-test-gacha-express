import mongoose, { Schema } from 'mongoose';
import { ReferenceType } from '../constants/transaction.enum.ts';

const inventorySchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        item: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const inventoryModel = mongoose.model('Inventory', inventorySchema);

export default inventoryModel;
