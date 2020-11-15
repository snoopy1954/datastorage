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