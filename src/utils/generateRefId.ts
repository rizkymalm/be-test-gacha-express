import moment from 'moment';

export async function generateRefId(prefix: string) {
    const timestampMs = moment().valueOf();
    const result = `${prefix}-${timestampMs}`;
    return result;
}
