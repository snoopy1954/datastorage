export interface InvoicingParty {
    id: string;
    name: string;
    person: string;
}

export type InvoicingPartyNoID = Omit<InvoicingParty, 'id'>;

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

export interface Document {
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
}

export interface Account {
    id: string;
    name: string;
    status: AccountStatus;
    passed: string;
    billIDs: string[];
    details: Details[];
    notes: Document[];
}

export type AccountNoID = Omit<Account, 'id'>;

export interface Bill {
    id: string;
    name: string;
    status: BillStatus;
    invoicingparty: string;
    accountID: string;
    details: Details[];
    notes: Document[];
}

export type BillNoID = Omit<Bill, 'id'>;

export interface BillWithFilesNoID extends BillNoID {
    files: File[];
}
