import { AccountNoID, Account, Name, Details, BillNoID } from '../../../../backend/src/types/axa';

import { AccountStatus } from '../../types/axa';

import { newDetails } from '../axa';
import { toCent, toEuro } from '../basic';

export const newAccount = (accounts: Account[]): AccountNoID => {
    const name: Name = {
        name: getCurrentDate(),
        seqnr: getMaxSeqnr(accounts)+1
    };

    const account: AccountNoID = {
        name: name,
        status: AccountStatus.OPEN,
        passed: '',
        notes: [],
        details: [],
        billIDs: []
    };
    account.details.push(newDetails());

    return account;
};

export const emptyAccount = (): AccountNoID => {
    const name: Name = {
        name: '',
        seqnr: 0
    };

    const account: AccountNoID = {
        name: name,
        status: AccountStatus.OPEN,
        passed: '',
        notes: [],
        details: [],
        billIDs: []
    };

    return account;
};

const getCurrentDate = (): string => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const day = new Date().getDate();
    
    return (day < 10 ? "0" : "") + day + "." + (month < 10 ? "0" : "") + month + "." + year;
};

const getMaxSeqnr = (accounts: Account[]): number => {
    let maxNumber = 0;
    Object.values(accounts).forEach(account => {
        if (account.name.seqnr>maxNumber) maxNumber = account.name.seqnr;
    });
    
    return maxNumber;
};

const sortAccountlist = (a: Account, b: Account) => {
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

export const sortAccounts = (accounts: Account[]) => {
    return accounts.sort(sortAccountlist);
};

export const getUpdatedAccount = (account: Account, bill: BillNoID): Account => {
    console.log(account, bill)
    const updatedAccount: Account = {
        ...account
    };

    const numberBillDetails: number = bill.details.length;
    const numberAccountDetails: number = account.details.length;

    if (numberAccountDetails===0) {
        const details: Details = newDetails(); 
        updatedAccount.details.push(details);
    }

    if (numberBillDetails>0) {
        let sumAmounts: string = '';

        if (bill.details.length===1) sumAmounts = bill.details[0].amount;
        if (bill.details.length===2) sumAmounts = toEuro(toCent(bill.details[0].amount) + toCent(bill.details[1].amount));
    
        updatedAccount.details[0].amount = toEuro(toCent(updatedAccount.details[0].amount) + toCent(sumAmounts));
    } 

    console.log(updatedAccount)

    return updatedAccount;
};

export const getAmount = (value: string): string => {
    return value===''||value===undefined ? '' : value + ' €';
};
