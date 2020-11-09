/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ImageNoID } from '../../types/image';
// import { parseString } from '../basicParser';

export const toNewImage = (object: any) => {
    // console.log(object);
    const data = parseBuffer(object);

    const newImage: ImageNoID = {
        filename: "",
        filetype: "",
        filesize: "",
        image: {
            data: data,
            contentType: "application/octet-stream"
        }
    };

    return newImage;
};

const parseBuffer = (text: any): Buffer => {
    return text;
};