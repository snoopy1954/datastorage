import { Accountyear, AccountyearNoID } from '../../../../backend/src/types/account';

export const newAccountyear = (years: Accountyear[]): AccountyearNoID => {
    let maxNumber = 0;
    let maxName = '0';
    Object.values(years).forEach(year => {
        if (year.seqnr>maxNumber) {
            maxNumber = year.seqnr;
            maxName = year.name
        }
    });
  
    const year: AccountyearNoID = {
        name: String(+maxName+1),
        seqnr: maxNumber + 1
    };
  
    return year;
};

export const emptyAccountyear = (): Accountyear => {
    const year: Accountyear = {
        id: '',
        name: '',
        seqnr: 0
    };
  
    return year;
};
  
export const getAccountyear = (years: Accountyear[], yearName: string): Accountyear => {
    let year: Accountyear = emptyAccountyear();
  
    Object.values(years).forEach(item => {
      if (item.name===yearName) year = item;
    });
  
    return year;
};

export const getCurrentAccountyear = (): string => {
    const year = String(new Date().getFullYear());
  
    return year;
};

const sortYearlist = (a: Accountyear, b: Accountyear) => {
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

export const sortAccountyears = (years: Accountyear[]) => {
  return years.sort(sortYearlist);
};


  
  