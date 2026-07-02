import type { Types } from 'mongoose';
import walletModels from '../models/wallet.model.ts';

interface PropWallet {
    user: Types.ObjectId;
    balance: number;
}

export async function walletGet({ user }: { user: Types.ObjectId }) {
    const wallet = walletModels.findOne({ user });
    return wallet.exec();
}

export async function walletCreate({ user, balance }: PropWallet) {
    const newWallet = new walletModels({
        user,
        balance,
    });

    return await newWallet.save();
}

export async function walletUpdate({ user, balance }: PropWallet) {
    const newWallet = await walletModels
        .updateOne(
            {
                _id: user,
            },
            {
                $set: {
                    balance: balance,
                },
            }
        )
        .exec();

    return newWallet;
}
