import mongoose, { Types } from 'mongoose';

const eventItemSchema = new mongoose.Schema(
    {
        event: {
            type: Types.ObjectId,
            required: true,
        },
        item: {
            type: Types.ObjectId,
            required: true,
        },
        dropRate: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const eventItemModels = mongoose.model('EventItem', eventItemSchema);

export default eventItemModels;
