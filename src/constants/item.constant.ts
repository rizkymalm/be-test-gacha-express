import type { PropsTierRange } from "../types/item.type.ts";

export const dropRateMax: PropsTierRange[] = [
    {
        tier: 'SILVER',
        min: 5,
        max: 20,
    },
    {
        tier: 'GOLD',
        min: 4,
        max: 15,
    },
    {
        tier: 'DIAMOND',
        min: 2,
        max: 8,
    },
    {
        tier: 'LEGENDARY',
        min: 1,
        max: 5,
    },
];


export enum TierType {
    SILVER = "SILVER",
    GOLD = "GOLD",
    DIAMOND = "DIAMOND",
    LEGENDARY = "LEGENDARY",
}