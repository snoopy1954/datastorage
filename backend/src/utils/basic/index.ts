/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GroupNoID } from '../../types/basic';

import { parseString, parseNumber, parseStringArray } from '../basicParser';

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
