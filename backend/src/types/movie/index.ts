import { Name } from '../basic';

export interface Moviegroup extends Name {
    id: string;
    subgroups: string[];
}

export type MoviegroupNoID = Omit<Moviegroup, 'id'>;

export interface Movieformat extends Name {
    id: string;
}

export type MovieformatNoID = Omit<Movieformat, 'id'>;

export interface Movie {
    id: string;
    title: Name;
    comment: string;
    format: string;
    moviegroup: string;
    subgroup: string;
    season: string;
    serial: string;
    maximal: string;
    launched: string;
    filename: string;
    checksum: string;
    createdAt: Date;
    modifiedAt: Date;
}

export type MovieNoID = Omit<Movie, 'id'>;

