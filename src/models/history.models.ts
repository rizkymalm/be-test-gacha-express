import mongoose, { Schema } from 'mongoose';

const historySchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        item: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        wallet: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        transaction: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        inventory: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const historyModels = mongoose.model('History', historySchema);

export default historyModels;
