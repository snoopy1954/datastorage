import { Name } from '../basic';

export interface Accounttype extends Name {
    id: string;
    iban: string;
    bic: string;
    number: string;
    balance: string;
    comment: string;
}

export type AccounttypeNoID = Omit<Accounttype, 'id'>;

export interface Accountyear extends Name {
    id: string;
}

export type AccountyearNoID = Omit<Accountyear, 'id'>;

export interface Transaction extends Name {
    id: string;
    checksum: string;
    accounttype: string;
    date: string;
    year: string;
    month: string;
    text: string;
    purpose: string;
    person: string;
    iban: string;
    bic: string;
    value: string;
    currency: string;
    info: string;
    balance: string;
}

export type TransactionNoID = Omit<Transaction, 'id'>;
