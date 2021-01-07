import { YearNoID, Year, Name } from '../../../../backend/src/types/axa';

import { newName } from '../basic';

import { z100s, vital750 } from '../../constants';


export const newYear = (years: Year[]): YearNoID => {
    let maxNumber = 0;
    let maxName = '0';
    Object.values(years).forEach(year => {
        if (year.name.seqnr>maxNumber) {
            maxNumber = year.name.seqnr;
            maxName = year.name.name
        }
    });

    maxName = maxName==='0' ? maxName = '2020' : String(+maxName+1);

    const name: Name = {
        name: maxName,
        seqnr: maxNumber + 1
    };

    const year: YearNoID = {
        name: name,
        z100s: z100s,
        vital750: vital750
    };

    return year;
};

export const emptyYear = (): Year => {
    const year: Year = {
        id: '',
        name: newName(),
        z100s: '',
        vital750: ''
    };

    return year;
};

const sortYearlist = (a: Year, b: Year) => {
    const nameA = a.name.seqnr;
    const nameB = b.name.seqnr;
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

