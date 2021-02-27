import { getOne as getFile } from '../../services/filesystem/files';
import { createFromBuffer } from '../../services/binarydata/images';
import { Binarydata } from '../../../../backend/src/types/image';

export const createImageFromFilename = async (filename: string): Promise<string> => {
    let id = '';
    filename = filename.replace(/\//g,'|');
    const exists = await getFile(filename, 'exists');
    if (exists) {
        const extension = filename.substring(filename.lastIndexOf('.') + 1);
        const content = await getFile(filename, 'file');
        const arrayBuffer = Buffer.from(content,'binary');
        const binarydata: Binarydata = await createFromBuffer(arrayBuffer, extension);
        id = binarydata.id;          
    }
    return id;
}