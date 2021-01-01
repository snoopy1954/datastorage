/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { YearNoID, MonthNoID, Day, Weight, Average } from '../../types/pressure';
import { parseString, parseNumber, parseBoolean } from './../basicParser';

export const toNewMonth = (object: any): MonthNoID => {
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

export const toNewYear = (object: any): YearNoID => {
        // console.log(object);
        const name = parseString(object.name.name);
        // console.log(`name='${name.name}'`);
        const seqnr = parseNumber(object.name.seqnr);
        // console.log(`seqnr='${name.seqnr}'`);
        const lastMonth = parseNumber(object.lastMonth);
        // console.log(`lastMonth='${name.lastMonth}'`);
        const isLastYear: boolean = parseBoolean(object.isLastYear);
        // console.log(`isLastYear='${name.isLastYear}'`);
 
    const year: YearNoID = {
        name: {
            seqnr,
            name
        },
        lastMonth,
        isLastYear
    };

    // console.log(year);

    return year;
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
