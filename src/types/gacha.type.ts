export interface GachaItem {
    _id: string;
    name: string;
    tier: 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGENDARY';
    dropRate: number;
}
