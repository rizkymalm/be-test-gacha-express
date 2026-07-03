import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

const itemModels = mongoose.model('Item', itemSchema);

export default itemModels;
