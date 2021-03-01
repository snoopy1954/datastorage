import { Artist, Cd, CdNoID } from '../../../../backend/src/types/music';

import { getCdRegexp } from '../music/postgres';
import { create, update, getOne } from '../../services/music/cd';


export const newCd = (): CdNoID => {
    const cd: CdNoID = {
        name: "",
        seqnr: 0,
        pgid: 0,
        pgartistident: 0,
        artistident: '',
        coverident: '',
        backident: '',
        group: '',
        year: '',
        source: '',
        folder: '',
        tracknumber: 0,
        trackidents: [],
        comment: '',
        time: '',
        size: '',
        bitrate: '',
    };

    return cd;
};

export const emptyCd = (): Cd => {
    const cd: Cd = {
        id: '',
        name: "",
        seqnr: 0,
        pgid: 0,
        pgartistident: 0,
        artistident: '',
        coverident: '',
        backident: '',
        group: '',
        year: '',
        source: '',
        folder: '',
        tracknumber: 0,
        trackidents: [],
        comment: '',
        time: '',
        size: '',
        bitrate: '',
     }
    return cd;
};

export const nextCd = (cds: Cd[]): CdNoID => {
    const cd: CdNoID = {
        name: "",
        seqnr: nextSeqnr(cds),
        pgid: 0,
        pgartistident: 0,
        artistident: '',
        coverident: '',
        backident: '',
        group: '',
        year: '',
        source: '',
        folder: '',
        tracknumber: 0,
        trackidents: [],
        comment: '',
        time: '',
        size: '',
        bitrate: '',
    };

    return cd;
};

export const nextSeqnr = (cds: Cd[]): number => {
    let maxNumber = 0;

    Object.values(cds).forEach(cd => {
        if (cd.seqnr >maxNumber) maxNumber = cd.seqnr;
    });
    
    return maxNumber+1;
};

const sortElements = (a: Cd, b: Cd) => {
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

export const sortCds = (cds: Cd[]): Cd[] => {
    return cds.sort(sortElements);
};

export const createCdFromPgRecord = async (record: string): Promise<Cd> => {
    let cd: Cd = emptyCd();

    const cdRegexp: RegExp = getCdRegexp();
    if (cdRegexp.test(record)) {
        const result: RegExpExecArray | null = cdRegexp.exec(record);
        if (result!==null&&result.length===18) {
            cd.pgid = +result[2];
            cd.name = result[4];
            cd.pgartistident = +result[5];
            cd.group = result[6];
            cd.source = result[7];
            cd.folder = result[8];
            cd.tracknumber = +result[10];
            cd.year = result[11];
            cd.time = result[15];
            cd.size = result[16];
            cd.bitrate = result[17];
            cd = (await create(cd));
        }
    }

    return cd;
};

export const updateCdFromPg = async (cd: Cd) => {
    await update(cd.id, cd);
};

export const getFilename = (cd: Cd, artist: string, type: string): string => {
    return '/mnt/MP3/MP3-' + cd.group + '-' + cd.source + '/' + artist + '/' + cd.folder + '/' + type + '.jpg';
};

export const cdTitle = (artist: Artist): string => {
    return (artist.name!=="") ? 'CDs von ' + artist.name : 'CDs';
};

export const getCdsOfArtist = async (artist: Artist): Promise<Cd[]> => {
    const cds: Cd[] = [];

    if (artist&&artist.id!=='') {
        await Promise.all(artist.cdidents.map(async (element: string) => {
            const cd: Cd = await getOne(element);
            cds.push(cd);
        }));     
    }

    return cds;
};

