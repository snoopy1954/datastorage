import { Name } from '../basic';
import { Content2 } from '../basic';

export interface Document extends Name {
    id: string;
    group: string;
    subgroup: string;
    contents: Content2[];
    keywords: string[];
    year: string;
    date: string;
    comment: string;
    person: string;
}

export type DocumentNoID = Omit<Document, 'id'>;
