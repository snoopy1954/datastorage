import { Name } from '../basic';

export interface MusicDetails {
    time: string;
    size: string;
    bitrate: string;
}

export interface Artist extends Name {
    id: string;
    pgid: string;
    cdnumber: number;
    cdidents: string[];
    group: string;
}

export type ArtistNoID = Omit<Artist, 'id'>;

export interface Cd extends Name, MusicDetails {
    id: string;
    pgid: string;
    artistident: string;
    coverident: string;
    backident: string;
    group: string;
    year: string;
    source: string;
    folder: string;
    tracknumber: number;
    trackidents: string[];
    comment: string;
}

export type CdNoID = Omit<Cd, 'id'>;

export interface Playlist extends Name, MusicDetails {
    id: string;
    pgid: string;
    tracknumber: number;
    trackidents: string[];
}

export type PlaylistNoID = Omit<Playlist, 'id'>;

export interface Track extends Name, MusicDetails {
    id: string;
    pgid: string;
    artistident: string;
    cdident: string;
    songtitle: string;
    songartist: string;
}

export type TrackNoID = Omit<Track, 'id'>;

export interface Selection {
    id: string;
    artistID: string;
    cdID: string;
    playlistID: string;
}

export type SelectionNoID = Omit<Selection, 'id'>;
