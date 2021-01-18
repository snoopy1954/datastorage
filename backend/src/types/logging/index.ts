import { Name } from '../basic';

export interface Logline {
    id: string;
    date: Name;
    text: string;
}

export type LoglineNoID = Omit<Logline, 'id'>;

export interface Historyline {
    id: string;
    date: Name;
    version: string;
    text: string;
}

export type HistorylineNoID = Omit<Historyline, 'id'>;
