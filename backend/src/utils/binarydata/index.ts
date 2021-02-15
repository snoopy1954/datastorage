/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BinarydataNoID } from '../../types/image';

export const toBinarydata = (object: any) => {
    // console.log(object);
    const data = parseBuffer(object);

    const file: BinarydataNoID = {
        data: data,
        type: "application/octet-stream"
    };

    return file;
};

const parseBuffer = (text: any): Buffer => {
    return text;
};