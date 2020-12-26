import { YearNoID, Year, Biller, Name, Details, Note, FileDate } from '../../../backend/src/types/axa';

import { z100s, vital750 } from '../constants';
import { Insurancetype } from '../types/axa';

const newName = (): Name => {
    return { name: '', seqnr: 0 };
};

const sortBillers = (a: Biller, b: Biller) => {
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

export const sortBillerList = (billers: Biller[]) => {
    return billers.sort(sortBillers);
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

export const newDetails = (): Details => {
    const year = String(new Date().getFullYear());

    const details: Details = {
        insurancetype: Insurancetype.VITAL750,
        year: year,
        amount: '',
        refund: '',
        deny: '',
        retension: '',
        dent20: '',
        cure10: '',
    };

    return details;
};

export const newNote = (): Note => {
    const note: Note = {
        filename: '',
        filetype: '',
        filesize: '',
        dataId: '',
        received: ''
    }

    return note;
}

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

export const getViewname = (name: string) => {
    return name.substr(6,2) + '.' + name.substr(4,2) + '.' + name.substr(0,4);
};

export const nextSeqnr = (billers: Biller[]): number => {
    let maxNumber = 0;
    Object.values(billers).forEach(biller => {
        if (biller.name.seqnr>maxNumber) maxNumber = biller.name.seqnr;
    });
    
    return maxNumber;
};

