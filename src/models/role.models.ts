import mongoose, { Schema } from 'mongoose';

const roleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            unique: true,
        },
        permission: {
            type: [String],
        }
    },
    {
        timestamps: true,
    }
);

const roleModels = mongoose.model('Role', roleSchema);

export default roleModels;
