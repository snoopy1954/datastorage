import { BillNoID } from '../../../backend/src/types/axa';

export enum Insurancetype {
    Z100S = 'Z 100 S',
    VITAL750 = 'VITAL 750'
}

export enum AccountStatus {
    OPEN = 'offen',
    PASSED = 'beantragt',
    CLOSED = 'geschlossen'
}

export enum BillStatus {
    RECEIVED = 'erhalten',
    PAYED = 'bezahlt',
}

export interface BillWithFilesNoID extends BillNoID {
    files: File[];
}

export interface FileDate {
    file: File;
    date: string;
}

export interface BillWithFileDatesNoID extends BillNoID {
    invoice: FileDate;
    recipe: FileDate;
}

