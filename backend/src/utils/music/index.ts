/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ArtistNoID, CdNoID, PlaylistNoID, TrackNoID, SelectionNoID } from '../../types/music';
import { parseString, parseNumber, parseStringArray } from './../basicParser';

export const toArtist = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const pgid = parseNumber(object.pgid);
    const cdnumber = parseNumber(object.cdnumber);
    const cdidents = parseStringArray(object.cdidents);
    const group = parseString(object.group);
    
    const artist: ArtistNoID = {
        name, 
        seqnr,
        pgid,
        group,
        cdnumber,
        cdidents,
    };

    return artist;
};

export const toCd = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const pgid = parseNumber(object.pgid);
    const pgartistident = parseNumber(object.pgartistident);
    const artistident = parseString(object.artistident);
    const coverident = parseString(object.coverident);
    const backident = parseString(object.backident);
    const time = parseString(object.time);
    const size = parseString(object.size);
    const bitrate = parseString(object.bitrate);
    const group = parseString(object.group);
    const year = parseString(object.year);
    const source = parseString(object.source);
    const folder = parseString(object.folder);
    const tracknumber = parseNumber(object.tracknumber);
    const trackidents = parseStringArray(object.trackidents);
    const comment = parseString(object.comment);

    const cd: CdNoID = {
        name, 
        seqnr,
        pgid,
        pgartistident,
        artistident,
        coverident,
        backident,
        time,
        size,
        bitrate,
        group,
        year,
        source,
        folder,
        tracknumber,
        trackidents,
        comment
    };

    return cd;
};

export const toPlaylist = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const pgid = parseNumber(object.pgid);
    const time = parseString(object.time);
    const size = parseString(object.size);
    const bitrate = parseString(object.bitrate);
    const tracknumber = parseNumber(object.tracknumber);
    const trackidents = parseStringArray(object.artistident);

    const playlist: PlaylistNoID = {
        name, 
        seqnr,
        pgid,
        time,
        size,
        bitrate,
        tracknumber,
        trackidents,
    };

    return playlist;
};

export const toTrack = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const pgid = parseNumber(object.pgid);
    const artistident = parseString(object.artistident);
    const cdident = parseString(object.cdident);
    const time = parseString(object.time);
    const size = parseString(object.size);
    const bitrate = parseString(object.bitrate);
    const songtitle = parseString(object.songtitle);
    const songartist = parseString(object.songartist);

    const track: TrackNoID = {
        name, 
        seqnr,
        pgid,
        artistident,
        cdident,
        time,
        size,
        bitrate,
        songtitle,
        songartist,
    };

    return track;
};

export const toSelection = (object: any): SelectionNoID => {
    const artistID = parseString(object.artistID);
    const cdID = parseString(object.cdID);
    const playlistID = parseString(object.playlistID);
    
    const selection: SelectionNoID = {
        artistID,
        cdID,
        playlistID
    };

    return selection;
};
