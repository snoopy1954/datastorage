/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BookgroupNoID, FormatNoID, OwnershipNoID, TongueNoID, BookNoID } from '../../types/book';
import { parseString, parseNumber, parseStringArray, parseDate } from '../basicParser';


export const toNewBook = (object: any) => {
    const name = parseString(object.title.name);
    const seqnr = parseNumber(object.title.seqnr);
    const givenname = parseString(object.author.givenname);
    const familyname = parseString(object.author.familyname);
    const comment = parseString(object.comment);
    const link = parseString(object.link);
    const launched = parseString(object.launched);
    const read = parseString(object.read);
    const createdAt = parseDate(object.createdAt);
    const modifiedAt = parseDate(object.modifiedAt);
    const bookgroup = parseString(object.bookgroup);
    const subgroup = parseString(object.subgroup);
    const ownership = parseString(object.ownership);
    const format = parseString(object.format);
    const tongue = parseString(object.tongue);
    const filename = parseString(object.content.filename);
    const filetype = parseString(object.content.filetype);
    const filesize = parseString(object.content.filesize);
    const dataId = parseString(object.content.dataId);
    const date = parseString(object.content.date);
    const description = parseString(object.content.description);

    const newBook: BookNoID = {
        title: {
            name,
            seqnr
        },
        author: {
            givenname,
            familyname
        },
        comment,
        link,
        launched,
        read,
        createdAt,
        modifiedAt,
        bookgroup,
        subgroup,
        ownership,
        format,
        tongue,
        content: {
            filename,
            filetype,
            filesize,
            dataId,
            date,
            description,
            seqnr: 0
         }
    };

    return newBook;
};

export const toNewBookgroup = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const subgroups = parseStringArray(object.subgroups);
    const newBookgroup: BookgroupNoID = {
        name,
        seqnr,
        subgroups: subgroups
    };

    return newBookgroup;
};

export const toNewFormat = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);

    const newFormat: FormatNoID = {
        name,
        seqnr
    };

    return newFormat;
};

export const toNewOwnership = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);

    const newOwnership: OwnershipNoID = {
        name,
        seqnr
    };

    return newOwnership;
};

export const toNewTongue = (object: any) => {

    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);

    const newTongue: TongueNoID = {
        name,
        seqnr
    };

    return newTongue;
};
