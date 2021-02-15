/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNoID } from '../../types/document';
import { Content2 } from '../../types/basic';
import { parseString, parseNumber, parseStringArray } from './../basicParser';

export const toDocument = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const group = parseString(object.group);
    const subgroup = parseString(object.subgroup);
    const contents = parseContents(object.contents);
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
        contents,
        keywords,
        year,
        date,
        comment,
        person
    };

    return document;
};

const parseContents = (contents: any): Content2[] => {

    if (!contents || !Array.isArray(contents) || contents.length < 1) {
        throw new Error(`Missing parameter: contents`);  
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return contents;
};


