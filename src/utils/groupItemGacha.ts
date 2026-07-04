import type { Types } from 'mongoose';
import type { Tier } from '../types/item.type.ts';

interface Props {
    _id: Types.ObjectId | String | String[];
    name: string;
    tier: Tier;
    dropRate: number;
    quantity: number;
}
export async function groupItemGacha(data: any[]) {
    let result: Props[] = [];
    for (let i = 0; i < data.length; i++) {
        const find = result.findIndex(
            item => data[i]._id.toString() === item._id.toString()
        );
        if (find === -1) {
            result.push({
                _id: data[i]._id,
                name: data[i].name,
                tier: data[i].tier,
                dropRate: data[i].dropRate,
                quantity: 1,
            });
        } else {
            result[find]!.quantity = result[find]!.quantity + 1;
        }
    }
    return result;
}
