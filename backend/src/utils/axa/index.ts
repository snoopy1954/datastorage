/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BillNoID, AccountNoID, Note, Details, AccountStatus, BillStatus, BillerNoID, YearNoID } from '../../types/axa';
import { parseString, parseStringArray, parseNumber } from './../basicParser';

export const toNewAccount = (object: any): AccountNoID => {
    // console.log(object);
    const name = parseString(object.name.name);
    // console.log(`name='${name.name}'`);
    const seqnr = parseNumber(object.name.seqnr);
    // console.log(`seqnr='${name.seqnr}'`);
    const status: AccountStatus = parseAccountStatus(object.status);
    // console.log(`status='${status}'`);
    const passed: string = parseString(object.passed);
    // console.log(`passed='${passed}'`);
    const notes: Note[] = parseNotes(object.notes);
    // console.log(`notes='${notes}'`);
    const details: Details[] = parseDetails(object.details);
    // console.log(`details='${details}'`);
    const billIDs: string[] = parseStringArray(object.billIDs);
    // console.log(`billIDs='${billIDs}'`);

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

    // console.log(account);

    return account;
};

export const toNewBill = (object: any): BillNoID => {
    // console.log(object);
    const name = parseString(object.name.name);
    // console.log(`name='${name.name}'`);
    const seqnr = parseNumber(object.name.seqnr);
    // console.log(`seqnr='${name.seqnr}'`);
    const status: BillStatus = parseBillStatus(object.status);
    // console.log(`status='${status}'`);
    const invoicingparty: string = parseString(object.invoicingparty);
    // console.log(`invoicingparty='${invoicingparty}'`);
    const notes: Note[] = parseNotes(object.notes);
    // console.log(`notes='${notes}'`);
    const details: Details[] = parseDetails(object.details);
    // console.log(`details='${details}'`);
    const accountID: string = parseString(object.accountID);
    // console.log(`accountID='${accountID}'`);
    
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

    // console.log(bill);

    return bill;
};

export const toNewBiller = (object: any): BillerNoID => {
    // console.log(object);
    const name = parseString(object.name.name);
    // console.log(`name='${name.name}'`);
    const seqnr = parseNumber(object.name.seqnr);
    // console.log(`seqnr='${name.seqnr}'`);
    const person: string = parseString(object.person);
    // console.log(`person='${person}'`);

    const biller: BillerNoID = {
        name: {
            seqnr,
            name
        },
        person
    };

    // console.log(biller);

    return biller;
};

export const toNewYear = (object: any): YearNoID => {
    // console.log(object);
    const name = parseString(object.name.name);
    // console.log(`name='${name.name}'`);
    const seqnr = parseNumber(object.name.seqnr);
    // console.log(`seqnr='${name.seqnr}'`);
    const z100s: string = parseString(object.z100s);
    // console.log(`z100s='${z100s}'`);
    const vital750: string = parseString(object.vital750);
    // console.log(`vital750='${vital750}'`);

    const year: YearNoID = {
        name: {
            seqnr,
            name
        },
        z100s,
        vital750
    };

    // console.log(year);

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

