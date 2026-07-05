import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        event: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ['ACTIVE', 'INACTIVE'],
        },
    },
    {
        timestamps: true,
    }
);

const eventModels = mongoose.model('Event', eventSchema);

export default eventModels;
