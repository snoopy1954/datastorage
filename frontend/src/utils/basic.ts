// import * as fs from "fs";
import { MD5 } from 'crypto-js';
import { Name } from '../../../backend/src/types/axa';
import { FileDate } from '../types/axa';


export const newName = (): Name => {
    return { name: '', seqnr: 0 };
};

export const getRandomNumber = (randomNumberMax: number): number => {
    return Math.floor(Math.random() * (randomNumberMax + 1));
};

export const getMD5 = (text: string): string => {
    return MD5(text).toString();
}

export const toEuro = (cent: number): string => {
    let euro = String(cent/100).replace('.', ',');
    if (!euro.includes(',')) euro = euro + ',00';
    const pos = euro.indexOf(',');
    const len = euro.length;
    if (len===pos+1) euro = euro + '00';
    if (len===pos+2) euro = euro + '0';
    return euro;
}

export const toCent = (euro: string): number => {
    if (!euro.includes(',')) euro = euro + ',00';
    const pos = euro.indexOf(',');
    const len = euro.length;
    if (len===pos+1) euro = euro + '00';
    if (len===pos+2) euro = euro + '0';
    const cent: number = +euro.replace(',', '');
    return cent;
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

const getCurrentDateAsArray = (): number[] => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const day = new Date().getDate();
    
    return [year, month, day];
};

export const getFolderFromAxaAccountname = (name: string): string => {
    const folder: string = name.substr(6,4) + name.substr(3,2) + name.substr(0,2);

    return folder;
};

const getDateAsCompareValue = (values: number[]): number => {

    return values[0] * 10000 + values[1] * 100 + values[2];
};

export const isValidDate = (text: string): boolean => {
    if (!text) return false;
    const date = text.toString();

    const parts = date.split('.');
    if (parts.length !== 3) return false;
  
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10)-1;
    const year = parts[2].length === 4 ? parseInt(parts[2]) : 2000 + parseInt(parts[2]);
    
    const today = getDateAsCompareValue(getCurrentDateAsArray());
    const test = getDateAsCompareValue([year, month, day]);
    if (test > today) return false;

    const checkdate = new Date(year, month, day);
    if (checkdate.getFullYear()===year && checkdate.getMonth()===month && checkdate.getDate()===day) {
        return true;
    }
    else {
        return false;
    }
};

export const getCurrentDate = (): string => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const day = new Date().getDate();
    
    return (day < 10 ? "0" : "") + day + "." + (month < 10 ? "0" : "") + month + "." + year;
};

export const newFiledate = (): FileDate => {
    const filedate: FileDate = { 
        file: new File([""], "filename"), 
        date: getCurrentDate() 
    };
    
    return filedate;
};

export const getAmount = (value: string): string => {
    return value===''||value===undefined ? '' : value + ' €';
};

export const getFormatedDate = (value: string): string => {
    return value.length===8 ? `${value.substr(6,2)}.${value.substr(4,2)}.${value.substr(0,4)}` : ''; 
};

export const getCurrentYear = (): string => {
    const year = String(new Date().getFullYear());
  
    return year;
};

