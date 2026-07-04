import type { ClientSession, Types } from 'mongoose';
import walletModels from '../models/wallet.model.ts';

interface PropWallet {
    user: Types.ObjectId | string | string[];
    balance: number;
}

interface PropWalletUpdate {
    id: Types.ObjectId | string | string[];
    balance: number;
    session: ClientSession;
}

export async function walletGet({
    user,
}: {
    user: Types.ObjectId | string | string[];
}) {
    const wallet = walletModels.findOne({ user }).select('user balance');
    return wallet.exec();
}

export async function walletCreate({ user, balance }: PropWallet) {
    const newWallet = new walletModels({
        user,
        balance,
    });

    return await newWallet.save();
}

export async function walletUpdateBalance({
    id,
    balance,
    session,
}: PropWalletUpdate) {
    const update = await walletModels
        .updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    balance: balance,
                },
            },
            { session }
        )
        .exec();

    return update;
}
