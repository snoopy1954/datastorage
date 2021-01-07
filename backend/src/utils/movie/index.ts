/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MovieNoID, MoviegroupNoID, MovieformatNoID } from '../../types/movie';
import { parseString, parseNumber, parseStringArray, parseDate } from '../basicParser';


export const toNewMovie = (object: any) => {
    // console.log(object);
    const name = parseString(object.title.name);
    // console.log(`name='${name}'`);
    const seqnr = parseNumber(object.title.seqnr);
    // console.log(`seqnr='${seqnr}'`);
    const comment = parseString(object.comment);
    // console.log(`comment='${comment}'`);
    const moviegroup = parseString(object.moviegroup);
    // console.log(`moviegroup='${moviegroup}'`);
    const subgroup = parseString(object.subgroup);
    // console.log(`subgroup='${subgroup}'`);
    const format = parseString(object.format);
    // console.log(`format='${format}'`);
    const season = parseString(object.season);
    // console.log(`season='${season}'`);
    const serial = parseString(object.serial);
    // console.log(`serial='${serial}'`);
    const maximal = parseString(object.maximal);
    // console.log(`maximal='${maximal}'`);
    const launched = parseString(object.launched);
    // console.log(`launched='${launched}'`);
    const filename = parseString(object.filename);
    // console.log(`filename='${filename}'`);
    const checksum = parseString(object.checksum);
    // console.log(`checksum='${checksum}'`);
    const createdAt = parseDate(object.createdAt);
    // console.log(`createdAt='${createdAt}'`);
    const modifiedAt = parseDate(object.modifiedAt);
    // console.log(`modifiedAt='${modifiedAt}'`);
 
    const newMovie: MovieNoID = {
        title: {
            name,
            seqnr
        },
        comment,
        moviegroup,
        subgroup,
        format,
        season,
        serial,
        maximal,
        launched,
        filename,
        checksum,
        createdAt,
        modifiedAt
    };

//    console.log(newMovie);

    return newMovie;
};

export const toNewMoviegroup = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const subgroups = parseStringArray(object.subgroups);
    const newMoviegroup: MoviegroupNoID = {
        name,
        seqnr,
        subgroups
    };

    return newMoviegroup;
};

export const toNewMovieformat = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);

    const newMovieformat: MovieformatNoID = {
        name,
        seqnr
    };

    return newMovieformat;
};



