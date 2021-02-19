import { Year, YearNoID } from '../../../../backend/src/types/basic';

export const nextYear = (years: Year[]): YearNoID => {
    let maxNumber = 0;
    let maxName = '0';
    Object.values(years).forEach(year => {
        if (year.seqnr>maxNumber) {
            maxNumber = year.seqnr;
            maxName = year.name
        }
    });
  
    const year: YearNoID = {
        name: String(+maxName+1),
        seqnr: maxNumber + 1
    };
  
    return year;
};

export const emptyYear = (): Year => {
    const year: Year = {
        id: '',
        name: '',
        seqnr: 0
    };
  
    return year;
};
  
export const getYear = (years: Year[], yearName: string): Year => {
    let year: Year = emptyYear();
  
    Object.values(years).forEach(item => {
      if (item.name===yearName) year = item;
    });
  
    return year;
};

export const getCurrentYear = (): string => {
    const year = String(new Date().getFullYear());
  
    return year;
};

const sortYearlist = (a: Year, b: Year) => {
  const nameA = a.seqnr;
  const nameB = b.seqnr;
  if (nameA > nameB) {
      return -1;
  }
  if (nameA < nameB) {
      return 1;
  }
  return 0;
};

export const sortYears = (years: Year[]) => {
  return years.sort(sortYearlist);
};

  
  