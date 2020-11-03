/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MovieNoID, MoviegroupNoID, MovieformatNoID } from '../../types/movie';
import { parseString, parseNumber, parseStringArray } from '../basicParser';

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
        filename,
        checksum,
        createdAt,
        modifiedAt
    };

//    console.log(newMovie);

    return newMovie;
};

export const toNewMoviegroup = (object: any) => {
    const name = parseString(object.groupname.name);
    const seqnr = parseNumber(object.groupname.seqnr);
    const subgroups = parseStringArray(object.subgroups);
    const newMoviegroup: MoviegroupNoID = {
        groupname: {
            name,
            seqnr
        },
        subgroups: subgroups
    };

    return newMoviegroup;
};

export const toNewMovieformat = (object: any) => {
    const name = parseString(object.formatname.name);
    const seqnr = parseNumber(object.formatname.seqnr);

    const newMovieformat: MovieformatNoID = {
        formatname: {
            name,
            seqnr
        }
    };

    return newMovieformat;
};


const parseDate = (text: any): Date => {
    if (!text) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return text;
};

