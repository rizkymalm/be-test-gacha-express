import moment from 'moment';

export function generateRefId(prefix: string) {
    const timestampMs = moment().valueOf();
    const result = `${prefix}-${timestampMs}`;
    return result;
}
