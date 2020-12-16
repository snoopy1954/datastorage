import { MD5 } from 'crypto-js';

export const getMD5 = (text: string): string => {
    return MD5(text).toString();
}

const toEuro = (cent: number): string => {
    return String(cent/100).replace('.', ',');
}

const toCent = (euro: string): number => {
    return +euro.replace(',', '');
}

export const getSum = (amounts: string[]): string => {
    const reducer = (sum: string, amount: string) => {
        return toEuro(toCent(sum) + toCent(amount));
    }
    return amounts.reduce(reducer,'0,00');
}

export const getDiff = (startvalue: string, amounts: string[]): string => {
    const reducer = (diff: string, amount: string) => {
        return toEuro(toCent(diff) - toCent(amount));
    }
    return amounts.reduce(reducer,startvalue);
}

const getCurrentDate = (): number => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const day = new Date().getDate();
    
    return year * 10000 + month * 100 + day;
};

export const isValidDate = (text: string): boolean => {
    if (!text) return false;
    const date = text.toString();

    const parts = date.split('.');
    if (parts.length !== 3) return false;
  
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10)-1;
    const year = parts[2].length === 4 ? parseInt(parts[2]) : 2000 + parseInt(parts[2]);
    
    const today = getCurrentDate();
    const test = year * 10000 + month * 100 + day;
    if (test > today) return false;

    const checkdate = new Date(year, month, day);
    if (checkdate.getFullYear()===year && checkdate.getMonth()===month && checkdate.getDate()===day) {
        return true;
    }
    else {
        return false;
    }
}
