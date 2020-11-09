import { MD5 } from 'crypto-js';

export const getMD5 = (text: string): string => {
    return MD5(text).toString();
}
