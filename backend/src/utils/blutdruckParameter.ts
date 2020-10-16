/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MonthNoID, Day, Weight, Average } from '../types/blutdruckTypes';

export const toNewMonth = (object: any) => {
    const key = parseString(object.key);
    const year = parseString(object.year);
    const month = parseString(object.month);
    const monthname = parseString(object.monthname);
    const weight = parseWeight(object.weight);
    const diastolic = parseAverage(object.diastolic);  
    const systolic = parseAverage(object.systolic); 
    const pulse = parseAverage(object.pulse);      
    const days = parseDays(object.days);

    const newMonth: MonthNoID = {
        key,
        year,
        month,
        monthname,
        weight,
        diastolic,
        systolic,
        pulse,
        days
    };

    return newMonth;
};

const parseWeight = (text: any): Weight => {

    return text;
};

const parseAverage = (text: any): Average => {

    return text;
};

const parseDays = (text: any): Day[] => {

    return text;
};

const parseString = (text: any): string => {
    if (!text || !isString(text)) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    return text;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
