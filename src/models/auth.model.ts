import mongoose, { Mongoose, Schema } from 'mongoose';

const authSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        role: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const authModels = mongoose.model('Auth', authSchema);

export default authModels;
