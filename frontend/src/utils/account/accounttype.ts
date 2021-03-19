import { Accounttype, AccounttypeNoID } from '../../../../backend/src/types/account';

export const newAccounttype = (): AccounttypeNoID => {
    const accounttype: AccounttypeNoID = {
        name: '',
        seqnr: 0,
        iban: '',
        bic: '',
        number: '',
        balance: '',
        comment: ''
    };

    return accounttype;
};

export const nextAccounttype = (accounttypes: Accounttype[]): AccounttypeNoID => {
    const accounttype: AccounttypeNoID = {
        name: "",
        seqnr: nextSeqnr(accounttypes),
        iban: '',
        bic: '',
        number: '',
        balance: '',
        comment: ''
    };

    return accounttype;
};

export const emptyAccounttype = (): Accounttype => {
    const accounttype: Accounttype = {
        id: '',
        name: '',
        seqnr: 0,
        iban: '',
        bic: '',
        number: '',
        balance: '',
        comment: ''
    }
    return accounttype;
};

export const nextSeqnr = (accounttypes: Accounttype[]): number => {
    let maxNumber = 0;
    Object.values(accounttypes).forEach(accounttype => {
        if (accounttype.seqnr >maxNumber) maxNumber = accounttype.seqnr;
    });
    
    return maxNumber+1;
};

export const getAccounttypeFromFilename = (accounttypes: Accounttype[], filename: string): Accounttype => {
    let accountype: Accounttype = emptyAccounttype();

    console.log(filename, accounttypes)
    Object.values(accounttypes).forEach(element => {
        if (filename.includes(element.number)&&element.number!=='') {
            accountype = element;
        }
    });
      
    return accountype;
}

const sortAccounttypelist = (a: Accounttype, b: Accounttype) => {
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
  
export const sortAccounttypes = (accounttypes: Accounttype[]) => {
    return accounttypes.sort(sortAccounttypelist);
};

