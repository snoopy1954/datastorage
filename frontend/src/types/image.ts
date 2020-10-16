export interface Image {
    id: string;
    data: Buffer;
}

export type ImageNoID = Omit<Image, 'id'>;