import { Name, Content2 } from '../basic';

export interface Ownership extends Name {
    id: string;
}

export type OwnershipNoID = Omit<Ownership, 'id'>;

export interface Subgroup {
    subgroup: string;
}

export interface Format extends Name {
    id: string;
}

export type FormatNoID = Omit<Format, 'id'>;

export interface Tongue extends Name {
    id: string;
}

export type TongueNoID = Omit<Tongue, 'id'>;

export interface Person {
    givenname: string;
    familyname: string;
}

export interface Content {
    filename: string;
    filetype: string;
    filesize: string;
    dataId: string;
}

export interface Book {
    id: string;
    title: Name;
    author: Person;
    comment: string;
    link: string;
    launched: string;
    read: string;
    createdAt: Date;
    modifiedAt: Date;
    bookgroup: string;
    subgroup: string;
    ownership: string;
    format: string;
    tongue: string;
    content: Content2;
}

export type BookNoID = Omit<Book, 'id'>;

