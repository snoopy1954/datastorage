import { ContentWithFile } from '../../types/basic';
import { Content2 } from '../../../../backend/src/types/basic';
import { Binarydata } from '../../../../backend/src/types/basic';

import { getOne, create, update, remove } from '../../services/binarydata/images';
import { getOne as getFile } from '../../services/filesystem/files';

import { getContent } from '../../utils/basic/binarydata';


export const newContent = (): ContentWithFile => {
    const content: ContentWithFile = {
        dataId: '',
        filename: '',
        filetype: '',
        filesize: '',
        date: '',
        description: '',
        seqnr: 0,
        file: new File([''], 'filename')
    };

    return content;
};

export const newBinarydata = (): Binarydata => {
    const binarydata: Binarydata = {
        id: '',
        data: Buffer.from(''),
        type: "application/octet-stream"
    };

    return binarydata;
}

export const content2contentwithfile = (content: Content2): ContentWithFile => {
    const contentwithfile: ContentWithFile = {
        ...content,
        file: new File([''], 'filename')
    };

    return contentwithfile;
};

export const getOneBinarydata = async (id: string, type: string): Promise<Binarydata> => {
    const binarydata: Binarydata = await getOne(id, type);
    return binarydata;
};

export const createContent = async (contentWithFile: ContentWithFile, type: string): Promise<Content2> => {
    const filedata: ArrayBuffer = await getContent(contentWithFile.file);
    const binarydata: Binarydata = await create(filedata, type);
    const content: Content2 = {
      dataId: binarydata.id,
      filename: contentWithFile.file.name,
      filetype: contentWithFile.file.type,
      filesize: String(contentWithFile.file.size),
      date: contentWithFile.date,
      description: contentWithFile.description,
      seqnr: contentWithFile.seqnr
    }

    return content;
};

// export const createImageFromImage = async (image: Image, extension: string): Promise<string> => {
//     const values = Object.values(image)[0];
//     console.log('createImageFromImage', values.data.data)
//     const img: number = values.data.data;
//     const arrayBuffer: Uint8Array = new Uint8Array(img);
//     const binarydata: Binarydata = await create(arrayBuffer, extension);
//     const id = binarydata.id; 

//     return id;
// };

export const createImageFromFile = async (filename: string): Promise<string> => {
    let id = '';
    filename = filename.replace(/\//g,'|').replace(/%/g,'%25');
    const exists = await getFile(filename, 'exists');
    if (exists) {
        const extension = filename.substring(filename.lastIndexOf('.') + 1);
        const content = await getFile(filename, 'file');
        const arrayBuffer = Buffer.from(content,'binary');
        const binarydata: Binarydata = await create(arrayBuffer, extension);
        id = binarydata.id;          
    }
    return id;
};

export const removeContent = async (id: string, type: string) => {
    remove(id, type);
};

export const updateContent = async (id: string, contentWithFile: ContentWithFile, type: string): Promise<Content2> => {
    const filedata: ArrayBuffer = await getContent(contentWithFile.file);
    const binarydata: Binarydata = await update(id, filedata, type);
    const content: Content2 = {
      dataId: binarydata.id,
      filename: contentWithFile.file.name,
      filetype: contentWithFile.file.type,
      filesize: String(contentWithFile.file.size),
      date: contentWithFile.date,
      description: contentWithFile.description,
      seqnr: contentWithFile.seqnr
    }

    return content;
};

export const sortContents = (contents: Content2[]) => {
    return contents.sort((a,b) => {
        const nameA = a.seqnr;
        const nameB = b.seqnr;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;    
    });
};



