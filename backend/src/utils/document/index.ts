/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNoID } from '../../types/document';
import { parseString, parseNumber, parseStringArray } from './../basicParser';

export const toDocument = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const group = parseString(object.group);
    const subgroup = parseString(object.subgroup);
    const filename = parseString(object.content.filename);
    const filetype = parseString(object.content.filetype);
    const filesize = parseString(object.content.filesize);
    const dataId = parseString(object.content.dataId);
    const keywords = parseStringArray(object.keywords);
    const year = parseString(object.year);
    const date = parseString(object.date);
    const comment = parseString(object.comment);
    const person = parseString(object.person);

    const document: DocumentNoID = {
        name, 
        seqnr,
        group,
        subgroup,
        content: {
            filename,
            filetype,
            filesize,
            dataId
        },
        keywords,
        year,
        date,
        comment,
        person
    };

    return document;
};

