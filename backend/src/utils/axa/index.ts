/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BillNoID, InvoicingPartyNoID, AccountNoID, Document, Details, AccountStatus, BillStatus } from '../../types/axa';
import { parseString, parseStringArray } from './../basicParser';

export const toNewAccount = (object: any): AccountNoID => {
    // console.log(object);
    const name: string = parseString(object.name);
    // console.log(`name='${name}'`);
    const status: AccountStatus = parseAccountStatus(object.status);
    // console.log(`status='${status}'`);
    const passed: string = parseString(object.passed);
    // console.log(`passed='${passed}'`);
    const notes: Document[] = parseDocuments(object.notes);
    // console.log(`notes='${notes}'`);
    const details: Details[] = parseDetails(object.details);
    // console.log(`details='${details}'`);
    const billIDs: string[] = parseStringArray(object.billIDs);
    // console.log(`billIDs='${billIDs}'`);

    const account : AccountNoID = {
        name,
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
    const name: string = parseString(object.name);
    // console.log(`name='${name}'`);
    const status: BillStatus = parseBillStatus(object.status);
    // console.log(`status='${status}'`);
    const invoicingparty: string = parseString(object.invoicingparty);
    // console.log(`invoicingparty='${invoicingparty}'`);
    const notes: Document[] = parseDocuments(object.notes);
    // console.log(`notes='${notes}'`);
    const details: Details[] = parseDetails(object.details);
    // console.log(`details='${details}'`);
    const accountID: string = parseString(object.accountID);
    // console.log(`accountID='${accountID}'`);
    
    const bill: BillNoID = {
        name,
        status,
        invoicingparty,
        accountID,
        details,
        notes,
    };

    // console.log(bill);

    return bill;
};

export const toNewInvoicingparty = (object: any) => {
    // console.log(object);
    const name: string = parseString(object.name);
    // console.log(`name='${name}'`);
    const person: string = parseString(object.person);
    // console.log(`person='${person}'`);

    const invoicingparty: InvoicingPartyNoID = {
        name,
        person
    };

    // console.log(invoicingparty);

    return invoicingparty;
};

const parseDocuments = (text: any): Document[] => {
    if (!text || !Array.isArray(text)) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    return text;
};

// const parseDocument = (text: any): Document => {
//     if (!text) {
//       throw new Error(`Incorrect or missing parameter: ${text}`);
//     }
  
//     return text;
// };

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

