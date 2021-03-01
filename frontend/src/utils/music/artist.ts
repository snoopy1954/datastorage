import { Artist, ArtistNoID } from '../../../../backend/src/types/music';
import { Filter } from '../../types/music';

import { getArtistRegexp } from '../music/postgres';
import { create, update } from '../../services/music/artist';


export const newArtist = (): ArtistNoID => {
    const artist: ArtistNoID = {
        name: "",
        seqnr: 0,
        pgid: 0,
        group: '',
        cdnumber: 0,
        cdidents: [],
    };

    return artist;
};

export const emptyArtist = (): Artist => {
    const artist: Artist = {
        id: '',
        name: "",
        seqnr: 0,
        pgid: 0,
        group: '',
        cdnumber: 0,
        cdidents: [],
     }
    return artist;
};

export const nextArtist = (artists: Artist[]): ArtistNoID => {
    const artist: ArtistNoID = {
        name: "",
        seqnr: nextSeqnr(artists),
        pgid: 0,
        group: '',
        cdnumber: 0,
        cdidents: [],
    };

    return artist;
};

export const nextSeqnr = (artists: Artist[]): number => {
    let maxNumber = 0;

    Object.values(artists).forEach(artist => {
        if (artist.seqnr >maxNumber) maxNumber = artist.seqnr;
    });
    
    return maxNumber+1;
};

const sortElements = (a: Artist, b: Artist) => {
    const nameA = a.seqnr;
    const nameB = b.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

export const sortArtists = (artists: Artist[]): Artist[] => {
    return artists.sort(sortElements);
};

export const getTitle = (filter: Filter): string => {
    let title = 'Interpreten';
    title += (filter.group!=="") ? ': ' + filter.group : '';
    title += (filter.startcharacter!=="") ? ' - \'' + filter.startcharacter + '\'' : '';
    title += (filter.name!=="") ? ' - \'' + filter.name + '\'' : '';

    return title;
};

export const getFilteredArtists = (artists: Artist[], filter: Filter): Artist[] => {
    let filteredArtists = (filter.group!=="") ? Object.values(artists).filter(artist => artist.group===filter.group) : artists;
    filteredArtists = (filter.startcharacter!==""&&filter.name==='') 
        ? Object.values(filteredArtists).filter(artist => artist.name.startsWith(filter.startcharacter)) 
        : filteredArtists;
    filteredArtists = (filter.name!=="") ? Object.values(filteredArtists).filter(artist => artist.name.toUpperCase().includes(filter.name.toUpperCase())) : filteredArtists;
    filteredArtists = sortArtists(Object.values(filteredArtists));

    return filteredArtists;
};

export const getArtistFromPgident = (artists: Artist[], pgid: number): Artist => {
    let filteredArtists = (pgid!==0) ? Object.values(artists).filter(artist => artist.pgid===pgid) : [];

    return filteredArtists.length>0 ? filteredArtists[0] :emptyArtist();
};

export const getArtistFromId = (artists: Artist[], id: string): Artist => {
    let filteredArtists = (id!=="") ? Object.values(artists).filter(artist => artist.id===id) : [];

    return filteredArtists.length>0 ? filteredArtists[0] :emptyArtist();
};

export const createArtistFromPgRecord = async (record: string): Promise<Artist> => {
    let artist: Artist = emptyArtist();

    const artistRegexp: RegExp = getArtistRegexp();
    if (artistRegexp.test(record)) {
        const result: RegExpExecArray | null = artistRegexp.exec(record);
        if (result!==null&&result.length===7) {
            artist.pgid = +result[2];
            artist.name = result[4];
            artist.group = result[5];
            artist = (await create(artist));
        }
    }

    return artist;
};

export const updateArtistFromPg = async (artist: Artist) => {
    await update(artist.id, artist);
};

