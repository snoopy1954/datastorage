export interface Name {
    seqnr: number;
    name: string;
}

export interface Year {
    id: string;
    name: Name;
    z100s: string;
    vital750: string;
}

export type YearNoID = Omit<Year, 'id'>;

export interface Biller {
    id: string;
    name: Name;
    person: string;
}

export type BillerNoID = Omit<Biller, 'id'>;

export enum AccountStatus {
    OPEN = 'offen',
    PASSED = 'beantragt',
    CLOSED = 'geschlossen'
}

export enum BillStatus {
    RECEIVED = 'erhalten',
    PAYED = 'bezahlt',
}

export enum Insurancetype {
    NONE = '',
    Z100S = 'Z 100 S',
    VITAL750 = 'VITAL 750'
}

export interface Note {
    filename: string;
    filetype: string;
    filesize: string;
    dataId: string;
    received: string;
}

export interface Details {
    insurancetype: Insurancetype;
    year: string;
    amount: string;
    refund: string;
    deny: string;
    retension: string;
    dent20: string;
    cure10: string;
}

export interface Account {
    id: string;
    name: Name;
    status: AccountStatus;
    passed: string;
    billIDs: string[];
    details: Details[];
    notes: Note[];
}

export type AccountNoID = Omit<Account, 'id'>;

export interface Bill {
    id: string;
    name: Name;
    status: BillStatus;
    invoicingparty: string;
    accountID: string;
    details: Details[];
    notes: Note[];
}

export type BillNoID = Omit<Bill, 'id'>;

