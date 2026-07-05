import { checkEventActive } from '../services/event.service.ts';
import { itemGet } from '../services/item.service.js';

export async function weightedRandom() {
    const checkEvent = await checkEventActive();
    const event = checkEvent?._id;
    if (event) {
        const items = await itemGet({ limit: 100, page: 1, event: event });
        const totalWeight = items.reduce((sum, item) => sum + item.dropRate, 0);
        let random = Math.random() * totalWeight;
        for (const item of items) {
            random -= item.dropRate;
            if (random < 0) {
                return item;
            }
        }
    }
}
