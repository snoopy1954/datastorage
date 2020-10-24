import { Image } from "../types/image";

export const getContent = async (file: File) => {
    const data: ArrayBuffer = await new Response(file).arrayBuffer();
    return data;
}

export const getImageUrl = (image: Image): string => {
    const data: Image = Object.values(image)[0];
    const type: string = Object.values(image)[1];
    const img: number = Object.values(data.data)[1];
    const arrayBufferView: Uint8Array = new Uint8Array( img );
    const blob: Blob = new Blob([ arrayBufferView ], { type: type });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl: string = urlCreator.createObjectURL( blob );

    return imageUrl;
}
