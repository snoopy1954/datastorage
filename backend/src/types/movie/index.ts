export interface Filter {
    group: string;
    subgroup: string;
}

export interface Name {
    seqnr: number;
    name: string;
}

export interface Moviegroup {
    id: string;
    groupname: Name;
    subgroups: string[];
}

export type MoviegroupNoID = Omit<Moviegroup, 'id'>;

export interface Subgroup {
    subgroup: string;
}

export interface Movieformat {
    id: string;
    formatname: Name;
}

export type MovieformatNoID = Omit<Movieformat, 'id'>;

export interface Movie {
    id: string;
    title: Name;
    comment: string;
    format: string;
    moviegroup: string;
    subgroup: string;
    filename: string;
    checksum: string;
    createdAt: Date;
    modifiedAt: Date;
}

export type MovieNoID = Omit<Movie, 'id'>;

export interface MovieWithFileNoID extends MovieNoID {
    file: File;
}
