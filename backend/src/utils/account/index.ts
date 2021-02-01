/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccounttypeNoID, AccountyearNoID, TransactionNoID } from '../../types/account';
import { parseString, parseNumber } from './../basicParser';

export const toAccounttype = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const iban = parseString(object.iban);
    const bic = parseString(object.bic);
    const number = parseString(object.number);
    const balance = parseString(object.balance);
    const comment = parseString(object.comment);

    const accountType: AccounttypeNoID = {
        name, 
        seqnr,
        iban,
        bic,
        number,
        balance,
        comment
    };

    return accountType;
};

export const toAccountyear = (object: any): AccountyearNoID => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);

    const year: AccountyearNoID = {
        name, 
        seqnr
    };

    return year;
};

export const toTransaction = (object: any): TransactionNoID => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const checksum = parseString(object.checksum);
    const accounttype = parseString(object.accounttype);
    const date = parseString(object.date);
    const year = parseString(object.year);
    const month = parseString(object.month);
    const text = parseString(object.text);
    const purpose = parseString(object.purpose);
    const person = parseString(object.person);
    const iban = parseString(object.iban);
    const bic = parseString(object.bic);
    const value = parseString(object.value);
    const currency = parseString(object.currency);
    const info = parseString(object.info);
    const balance = parseString(object.balance);

    const transaction: TransactionNoID = {
        name,
        seqnr,
        checksum,
        accounttype,
        date,
        year,
        month,
        text,
        purpose,
        person,
        iban,
        bic,
        value,
        currency,
        info,
        balance
    };

    return transaction;
};
