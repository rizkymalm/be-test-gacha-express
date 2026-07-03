import type { Types } from 'mongoose';

export type Tier = 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGENDARY';

export interface PropsItemCreate {
    name: string;
    image: string;
    tier: 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGENDARY';
    dropRate: number;
}

export interface PropsItemUpdate {
    id: string | Types.ObjectId | string[];
    name: string;
    image: string;
    tier: 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGENDARY';
    dropRate: number;
}

export interface PropsItemEditDropRate {
    id: string | Types.ObjectId | string[];
    tier: 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGENDARY';
    dropRate: number;
}

export interface PropsTierRange {
    tier: Tier;
    min: number;
    max: number;
}
