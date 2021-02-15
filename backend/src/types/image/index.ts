export interface Image {
    id: string;
    filename: string;
    filetype: string;
    filesize: string;
    image: {
        data: Buffer, 
        contentType: string
    };
}

export type ImageNoID = Omit<Image, 'id'>;

export interface Content {
    filename: string;
    filetype: string;
    filesize: string;
    dataId: string;
}

export interface Binarydata {
    id: string;
    data: Buffer, 
    type: string
}

export type BinarydataNoID = Omit<Binarydata, 'id'>;

