/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BinarydataNoID, FormatNoID, GroupNoID, YearNoID } from '../../types/basic';
import { parseString, parseNumber, parseStringArray, parseBuffer } from '../basicParser';

export const toGroup = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const subgroups = parseStringArray(object.subgroups);
    const group: GroupNoID = {
        name,
        seqnr,
        subgroups
    };

    return group;
};

export const toYear = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const year: YearNoID = {
        name,
        seqnr,
    };

    return year;
};

export const toBinarydata = (object: any) => {
    const data = parseBuffer(object);

    const file: BinarydataNoID = {
        data: data,
        type: "application/octet-stream"
    };

    return file;
};

export const toFormat = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);

    const format: FormatNoID = {
        name,
        seqnr
    };

    return format;
};

