/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LoglineNoID, HistorylineNoID, InfoNoID } from '../../types/logging';
import { parseString, parseNumber } from '../basicParser';


export const toNewHistoryline = (object: any) => {
    // console.log(object);
    const name = parseString(object.date.name);
    // console.log(`name='${name}'`);
    const seqnr = parseNumber(object.date.seqnr);
    // console.log(`seqnr='${seqnr}'`);
    const version = parseString(object.version);
    // console.log(`version='${version}'`);
    const text = parseString(object.text);
    // console.log(`text='${text}'`);
 
    const newHistoryline: HistorylineNoID = {
        date: {
            name,
            seqnr
        },
        version,
        text
    };

//    console.log(newHistoryline);

    return newHistoryline;
};

export const toNewLogline = (object: any) => {
    // console.log(object);
    const name = parseString(object.date.name);
    // console.log(`name='${name}'`);
    const seqnr = parseNumber(object.date.seqnr);
    // console.log(`seqnr='${seqnr}'`);
    const text = parseString(object.text);
    // console.log(`text='${text}'`);
 
    const newLogline: LoglineNoID = {
        date: {
            name,
            seqnr
        },
        text
    };

//    console.log(newLogline);

    return newLogline;
};

export const toNewInfo = (object: any) => {
    // console.log(object);
    const date = parseString(object.date);
    // console.log(`date='${date}'`);
    const version = parseString(object.version);
    // console.log(`version='${version}'`);
 
    const newInfo: InfoNoID = {
        date,
        version
    };

//    console.log(newInfo);

    return newInfo;
};

