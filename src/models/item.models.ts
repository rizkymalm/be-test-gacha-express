import mongoose, { Types } from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
        tier: {
            type: String,
            required: true,
            enum: ['SILVER', 'GOLD', 'DIAMOND', 'LEGENDARY'],
        },
        dropRate: {
            type: Number,
            required: true,
        },
        event: {
            type: [Types.ObjectId],
            required: false,
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const itemModels = mongoose.model('Item', itemSchema);

export default itemModels;
