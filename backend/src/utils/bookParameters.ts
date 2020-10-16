/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BookgroupNoID, FormatNoID, OwnershipNoID, TongueNoID, BookNoID } from '../types/bookTypes';
import { parseString, parseNumber, parseStringArray } from './basicParser';

export const toNewBook = (object: any) => {
    // console.log(object);
    const name = parseString(object.title.name);
    // console.log(`name='${name}'`);
    const seqnr = parseNumber(object.title.seqnr);
    // console.log(`seqnr='${seqnr}'`);
    const givenname = parseString(object.author.givenname);
    // console.log(`givenname='${givenname}'`);
    const familyname = parseString(object.author.familyname);
    // console.log(`familyname='${familyname}'`);
    const comment = parseString(object.comment);
    // console.log(`comment='${comment}'`);
    const link = parseString(object.link);
    // console.log(`link='${link}'`);
    const launched = parseString(object.launched);
    // console.log(`launched='${launched}'`);
    const read = parseString(object.read);
    // console.log(`read='${read}'`);
    const createdAt = parseString(object.createdAt);
    // console.log(`createdAt='${createdAt}'`);
    const modifiedAt = parseString(object.modifiedAt);
    // console.log(`modifiedAt='${modifiedAt}'`);
    const bookgroup = parseString(object.bookgroup);
    // console.log(`bookgroup='${bookgroup}'`);
    const subgroup = parseString(object.subgroup);
    // console.log(`subgroup='${subgroup}'`);
    const ownership = parseString(object.ownership);
    // console.log(`ownership='${ownership}'`);
    const format = parseString(object.format);
    // console.log(`format='${format}'`);
    const tongue = parseString(object.tongue);
    // console.log(`tongue='${tongue}'`);
    const filename = parseString(object.content.filename);
    // console.log(`filename='${filename}'`);
    const filetype = parseString(object.content.filetype);
    // console.log(`filetype='${filetype}'`);
    const filesize = parseString(object.content.filesize);
    // console.log(`filesize='${filesize}'`);
    const dataId = parseString(object.content.dataId);
    // console.log('dataId', dataId);

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
            dataId
        }
    };

//    console.log(newBook);

    return newBook;
};

export const toNewBookgroup = (object: any) => {
    const name = parseString(object.groupname.name);
    const seqnr = parseNumber(object.groupname.seqnr);
    const subgroups = parseStringArray(object.subgroups);
    const newBookgroup: BookgroupNoID = {
        groupname: {
            name,
            seqnr
        },
        subgroups: subgroups
    };

    return newBookgroup;
};

export const toNewFormat = (object: any) => {
    const name = parseString(object.formatname.name);
    const seqnr = parseNumber(object.formatname.seqnr);

    const newFormat: FormatNoID = {
        formatname: {
            name,
            seqnr
        }
    };

    return newFormat;
};

export const toNewOwnership = (object: any) => {
    const name = parseString(object.ownershipname.name);
    const seqnr = parseNumber(object.ownershipname.seqnr);

    const newOwnership: OwnershipNoID = {
        ownershipname: {
            name,
            seqnr
        }
    };

    return newOwnership;
};

export const toNewTongue = (object: any) => {
    const name = parseString(object.tonguename.name);
    const seqnr = parseNumber(object.tonguename.seqnr);

    const newTongue: TongueNoID = {
        tonguename: {
            name,
            seqnr
        }
    };

    return newTongue;
};
