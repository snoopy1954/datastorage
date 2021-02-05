export interface Name {
    seqnr: number;
    name: string;
}

export interface Group extends Name {
    id: string;
    subgroups: string[];
}

export type GroupNoID = Omit<Group, 'id'>;

export interface FileContent {
    filename: string;
    content: string;
}

export interface Content {
    filename: string;
    filetype: string;
    filesize: string;
    dataId: string;
}
