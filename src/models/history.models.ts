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
        referenceId: {
            type: String,
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
