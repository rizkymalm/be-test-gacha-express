import { dropRateMax, type TierType } from '../constants/item.constant.js';
import type { PropsTierRange } from '../types/item.type.js';

interface Props {
    tier: TierType;
    value: number;
}

export function dropRateRange({ tier, value }: Props) {
    let result = false;
    const index = dropRateMax.findIndex(
        (item: PropsTierRange) => item.tier === tier
    );
    const min = dropRateMax[index]?.min || 0;
    const max = dropRateMax[index]?.max || 0;
    if (value >= min && value <= max) {
        result = true;
    }
    return result;
}
