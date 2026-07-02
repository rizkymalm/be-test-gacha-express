import mongoose, { Schema } from 'mongoose';

const walletSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const walletModels = mongoose.model('Wallet', walletSchema);

export default walletModels;
