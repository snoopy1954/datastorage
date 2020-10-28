/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ImageNoID } from '../../types/image';
// import { parseString } from '../basicParser';

export const toNewImage = (object: any) => {
    // console.log(object);
    // const filename = parseString(object.filename);
    // console.log(`filename='${filename}'`);
    // const filetype = parseString(object.filetype);
    // console.log(`filetype='${filetype}'`);
    // const filesize = parseString(object.filesize);
    // console.log(`filesize='${filesize}'`);
    // const data = parseBuffer(object.data);
    // console.log('dataId', dataId);

    const data = parseBuffer(object);

    console.log(data);

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