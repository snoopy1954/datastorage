export interface Name {
    seqnr: number;
    name: string;
}

export interface Group extends Name {
    id: string;
    subgroups: string[];
}
export type GroupNoID = Omit<Group, 'id'>;

export interface Year extends Name {
    id: string;
}
export type YearNoID = Omit<Year, 'id'>;

export interface Format extends Name {
    id: string;
}

export type FormatNoID = Omit<Format, 'id'>;

export interface FileContent {
    filename: string;
    content: string;
}

export interface Content2 {
    dataId: string;
    filename: string;
    filetype: string;
    filesize: string;
    date: string;
    description: string;
    seqnr: number;
}

export interface Binarydata {
    id: string;
    data: Buffer, 
    type: string
}

export type BinarydataNoID = Omit<Binarydata, 'id'>;
