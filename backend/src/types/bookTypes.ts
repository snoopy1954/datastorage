export interface Name {
    seqnr: number;
    name: string;
}

export interface Bookgroup {
    id: string;
    groupname: Name;
    subgroups: [string];
}

export type BookgroupNoID = Omit<Bookgroup, 'id'>;

export interface Ownership {
    id: string;
    ownershipname: Name;
}

export type OwnershipNoID = Omit<Ownership, 'id'>;

export interface Format {
    id: string;
    formatname: Name;
}

export type FormatNoID = Omit<Format, 'id'>;

export interface Tongue {
    id: string;
    tonguename: Name;
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
    createdAt: string;
    modifiedAt: string;
    bookgroup: string;
    subgroup: string;
    ownership: string;
    format: string;
    tongue: string;
    content: Content;
}

export type BookNoID = Omit<Book, 'id'>;

// https://gist.github.com/aheckmann/2408370