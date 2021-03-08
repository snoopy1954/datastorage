import { getOne as getFile } from '../../services/filesystem/files';
import { createX } from '../../services/binarydata/images';
import { Binarydata, Image } from '../../../../backend/src/types/image';

export const createImageFromFilename = async (filename: string): Promise<string> => {
    let id = '';
    filename = filename.replace(/\//g,'|').replace(/%/g,'%25');
    const exists = await getFile(filename, 'exists');
    if (exists) {
        const extension = filename.substring(filename.lastIndexOf('.') + 1);
        const content = await getFile(filename, 'file');
        const arrayBuffer = Buffer.from(content,'binary');
        const binarydata: Binarydata = await createX(arrayBuffer, extension);
        id = binarydata.id;          
    }
    return id;
};

export const createImageFromImage = async (image: Image, extension: string): Promise<string> => {
    const values = Object.values(image)[0];
    console.log('createImageFromImage', values.data.data)
    const img: number = values.data.data;
    const arrayBuffer: Uint8Array = new Uint8Array(img);
    const binarydata: Binarydata = await createX(arrayBuffer, extension);
    const id = binarydata.id; 

    return id;
};