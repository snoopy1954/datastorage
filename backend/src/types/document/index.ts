import { Name, Content } from '../basic';

export interface Document extends Name {
    id: string;
    group: string;
    subgroup: string;
    content: Content;
    keywords: string[];
    year: string;
    date: string;
    comment: string;
    person: string;
}

export type DocumentNoID = Omit<Document, 'id'>;
