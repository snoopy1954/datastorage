import { Cd, Track, TrackNoID } from '../../../../backend/src/types/music';

import { getTrackRegexp } from '../music/postgres';
import { create, getOne } from '../../services/music/track';


export const newTrack = (): TrackNoID => {
    const track: TrackNoID = {
        name: "",
        seqnr: 0,
        pgid: 0,
        artistident: '',
        cdident: '',
        time: '',
        size: '',
        bitrate: '',
        songtitle: '',
        songartist: '',
    };

    return track;
};

export const emptyTrack = (): Track => {
    const track: Track = {
        id: '',
        name: "",
        seqnr: 0,
        pgid: 0,
        artistident: '',
        cdident: '',
        time: '',
        size: '',
        bitrate: '',
        songtitle: '',
        songartist: '',
     }
    return track;
};

export const nextTrack = (tracks: Track[]): TrackNoID => {
    const track: TrackNoID = {
        name: "",
        seqnr: nextSeqnr(tracks),
        pgid: 0,
        artistident: '',
        cdident: '',
        time: '',
        size: '',
        bitrate: '',
        songtitle: '',
        songartist: '',
    };

    return track;
};

export const nextSeqnr = (tracks: Track[]): number => {
    let maxNumber = 0;

    Object.values(tracks).forEach(track => {
        if (track.seqnr >maxNumber) maxNumber = track.seqnr;
    });
    
    return maxNumber+1;
};

const sortElements = (a: Track, b: Track) => {
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

export const sortTracks = (tracks: Track[]): Track[] => {
    return tracks.sort(sortElements);
};

export const createTrackFromPgRecord = async (record: string, artistident: string, cdident: string): Promise<Track> => {
    let track: Track = emptyTrack();
    const trackRegexp: RegExp = getTrackRegexp();
    if (trackRegexp.test(record)) {
        const result: RegExpExecArray | null = trackRegexp.exec(record);
        if (result!==null&&result.length===16) {
            track.pgid = +result[2];
            track.seqnr = +result[3];
            track.name = result[4];
            track.artistident = artistident;
            track.cdident = cdident;
            track.time = result[9];
            track.size = result[10];
            track.bitrate = result[11];
            track.songtitle = result[12];
            track.songartist = result[13];
            track = (await create(track));
        }
    }

    return track;
};

export const getTracksOfCd = async (cd: Cd): Promise<Track[]> => {
    const tracks: Track[] = [];

    if (cd&&cd.id!=='') {
        await Promise.all(cd.trackidents.map(async (element: string) => {
            const track: Track = await getOne(element);
            tracks.push(track);
        }));     
    }

    return sortTracks(tracks);
};

