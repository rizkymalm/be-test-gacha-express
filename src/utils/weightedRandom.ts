import { itemGet } from '../services/item.service.ts';

export async function weightedRandom() {
    const items = await itemGet({ limit: 100, page: 1 });
    const totalWeight = items.reduce((sum, item) => sum + item.dropRate, 0);
    let random = Math.random() * totalWeight;
    for (const item of items) {
        random -= item.dropRate;
        if (random < 0) {
            return item;
        }
    }
}
