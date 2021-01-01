import { BillNoID, Bill, Name } from '../../../../backend/src/types/axa';

import { BillStatus } from '../../types/axa';
import { newDetails } from './axa';
import { toCent, toEuro } from '../basic';

export const newBill = (bills: Bill[]): BillNoID => {
    const name: Name = {
        name: '',
        seqnr: getMaxSeqnr(bills)+1
    };

    const bill: BillNoID = {
        name: name,
        status: BillStatus.RECEIVED,
        invoicingparty: '',
        accountID: '',
        notes: [],
        details: [],
    };
    bill.details.push(newDetails());

    return bill;
};

export const emptyBill = (): BillNoID => {
    const name: Name = {
        name: '',
        seqnr: 0
    };

    const bill: BillNoID = {
        name: name,
        status: BillStatus.RECEIVED,
        invoicingparty: '',
        accountID: '',
        notes: [],
        details: [],
    };

    return bill;
};

export const getSumAmounts = (bill: Bill): string => {
    let sumAmounts: string = '';

    if (bill.details.length===1) sumAmounts = bill.details[0].amount;
    if (bill.details.length===2) sumAmounts = toEuro(toCent(bill.details[0].amount) + toCent(bill.details[1].amount));

    return sumAmounts; 
};

const getMaxSeqnr = (bills: Bill[]): number => {
    let maxNumber = 0;
    Object.values(bills).forEach(bill => {
        if (bill.name.seqnr>maxNumber) maxNumber = bill.name.seqnr;
    });
    
    return maxNumber;
};

const sortBilllist = (a: Bill, b: Bill) => {
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

export const sortBills = (bills: Bill[]) => {
    return bills.sort(sortBilllist);
};
