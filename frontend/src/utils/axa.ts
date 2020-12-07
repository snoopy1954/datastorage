import { AccountNoID, BillNoID } from '../../../backend/src/types/axa';

import { AccountStatus, BillStatus, Insurancetype } from '../types/axa';
import { Details, Note } from '../../../backend/src/types/axa';

export const newAccount = (): AccountNoID => {
    const actualDate = new Date().toISOString().substring(0, 10).replace(/-/g,"");

    const account: AccountNoID = {
        name: actualDate,
        status: AccountStatus.OPEN,
        passed: '',
        notes: [],
        details: [],
        billIDs: []
    };

    return account;
};

export const newDetails = (): Details => {
    const year = String(new Date().getFullYear());

    const details: Details = {
        insurancetype: Insurancetype.VITAL750,
        year: year,
        amount: '',
        refund: '',
        deny: '',
        retension: ''
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

export const newBill = (): BillNoID => {
    const bill: BillNoID = {
        name: '',
        status: BillStatus.RECEIVED,
        invoicingparty: '',
        accountID: '',
        notes: [],
        details: [],
    };
    bill.details.push(newDetails());

    return bill;
};

