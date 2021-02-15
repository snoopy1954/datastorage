import { ContentWithFile } from '../../types/basic';
import { Content2 } from '../../../../backend/src/types/basic';
import { Binarydata } from '../../../../backend/src/types/image';

import { create, remove } from '../../services/binarydata/images';


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

export const content2contentwithfile = (content: Content2): ContentWithFile => {
    const contentwithfile: ContentWithFile = {
        ...content,
        file: new File([''], 'filename')
    };

    return contentwithfile;
};

export const createContent = async (contentWithFile: ContentWithFile): Promise<Content2> => {
    const binarydata: Binarydata = await create(contentWithFile.file);
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

export const removeContent = async (id: string) => {
    remove(id);
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



