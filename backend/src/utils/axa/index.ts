/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BillNoID, AccountNoID, Note, Details, AccountStatus, BillStatus, BillerNoID, YearNoID } from '../../types/axa';
import { parseString, parseStringArray, parseNumber } from './../basicParser';

export const toNewAccount = (object: any): AccountNoID => {
    const name = parseString(object.name.name);
    const seqnr = parseNumber(object.name.seqnr);
    const status: AccountStatus = parseAccountStatus(object.status);
    const passed: string = parseString(object.passed);
    const notes: Note[] = parseNotes(object.notes);
    const details: Details[] = parseDetails(object.details);
    const billIDs: string[] = parseStringArray(object.billIDs);

    const account : AccountNoID = {
        name: {
            seqnr,
            name
        },
        status,
        passed,
        billIDs,
        details,
        notes,
    };

    return account;
};

export const toNewBill = (object: any): BillNoID => {
    const name = parseString(object.name.name);
    const seqnr = parseNumber(object.name.seqnr);
    const status: BillStatus = parseBillStatus(object.status);
    const invoicingparty: string = parseString(object.invoicingparty);
    const notes: Note[] = parseNotes(object.notes);
    const details: Details[] = parseDetails(object.details);
    const accountID: string = parseString(object.accountID);
    
    const bill: BillNoID = {
        name: {
            seqnr,
            name
        },
        status,
        invoicingparty,
        accountID,
        details,
        notes,
    };

    return bill;
};

export const toNewBiller = (object: any): BillerNoID => {
    const name = parseString(object.name.name);
    const seqnr = parseNumber(object.name.seqnr);
    const person: string = parseString(object.person);

    const biller: BillerNoID = {
        name: {
            seqnr,
            name
        },
        person
    };

    return biller;
};

export const toYear = (object: any): YearNoID => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const z100s: string = parseString(object.z100s);
    const vital750: string = parseString(object.vital750);

    const year: YearNoID = {
        seqnr,
        name,
        z100s,
        vital750
    };

    return year;
};

const parseNotes = (text: any): Note[] => {
    if (!text || !Array.isArray(text)) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    return text;
};

const parseDetails = (text: any): Details[] => {
    if (!text || !Array.isArray(text)) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    return text;
};

const parseAccountStatus = (status: any): AccountStatus => {
    if (!status || !isAccountStatus(status)) {
      throw new Error(`Incorrect or missing status: ${status}`);
    }
  
    return status;
};

const isAccountStatus = (param: any): param is AccountStatus => {
    return Object.values(AccountStatus).includes(param);
};

const parseBillStatus = (status: any): BillStatus => {
    if (!status || !isBillStatus(status)) {
      throw new Error(`Incorrect or missing status: ${status}`);
    }
  
    return status;
};

const isBillStatus = (param: any): param is BillStatus => {
    return Object.values(BillStatus).includes(param);
};

