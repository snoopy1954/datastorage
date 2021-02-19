/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityNoID } from '../../types/sport';
import { parseString, parseNumber } from './../basicParser';

export const toActivity = (object: any) => {
    const name = parseString(object.name);
    const seqnr = parseNumber(object.seqnr);
    const group = parseString(object.group);
    const distance = parseString(object.distance);
    const duration = parseString(object.duration);
    const steps = parseString(object.steps);
    const year = parseString(object.year);
    const date = parseString(object.date);
    const comment = parseString(object.comment);
    
    const activity: ActivityNoID = {
        name, 
        seqnr,
        group,
        distance,
        duration,
        steps,
        year,
        date,
        comment,
    };

    return activity;
};
