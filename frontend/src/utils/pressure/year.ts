import { Year, YearNoID } from '../../../../backend/src/types/pressure';

export const newYear = (years: Year[]): YearNoID => {
    let maxNumber = 0;
    let maxName = '0';
    Object.values(years).forEach(year => {
        if (year.name.seqnr>maxNumber) {
            maxNumber = year.name.seqnr;
            maxName = year.name.name
        }
    });
  
    const year: YearNoID = {
      name: {
        name: String(+maxName+1),
        seqnr: maxNumber + 1
      },
      lastMonth: 1,
      isLastYear: true
    };
  
    return year;
};

export const emptyYear = (): Year => {
    const year: Year = {
        id: '',
        name: {
          name: '',
          seqnr: 0
        },
        lastMonth: 0,
        isLastYear: false
    };
  
    return year;
};
  
export const getYear = (years: Year[], yearName: string): Year => {
    let year: Year = emptyYear();
  
    Object.values(years).forEach(item => {
      if (item.name.name===yearName) year = item;
    });
  
    return year;
};

export const getCurrentYear = (): string => {
    const year = String(new Date().getFullYear());
  
    return year;
};
  
  