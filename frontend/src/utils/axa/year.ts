import { YearNoID, Year } from '../../../../backend/src/types/axa';

import { z100s, vital750 } from '../../constants';


export const newYear = (years: Year[]): YearNoID => {
    let maxNumber = 0;
    let maxName = '0';
    Object.values(years).forEach(year => {
        if (year.seqnr>maxNumber) {
            maxNumber = year.seqnr;
            maxName = year.name
        }
    });

    maxName = maxName==='0' ? maxName = '2020' : String(+maxName+1);

    const year: YearNoID = {
        name: maxName,
        seqnr: maxNumber + 1,
        z100s: z100s,
        vital750: vital750
    };

    return year;
};

export const emptyYear = (): Year => {
    const year: Year = {
        id: '',
        name: '',
        seqnr: 0,
        z100s: '',
        vital750: ''
    };

    return year;
};

const sortYearlist = (a: Year, b: Year) => {
    const nameA = a.seqnr;
    const nameB = b.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

export const sortYears = (years: Year[]) => {
    return years.sort(sortYearlist);
};

