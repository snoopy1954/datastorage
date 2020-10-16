import { Image } from "../types/image";

export const getContent = async (file: File) => {
    const data: ArrayBuffer = await new Response(file).arrayBuffer();
    return data;
}

export const getImageUrl = (image: Image) => {
    const data: Image = Object.values(image)[0];
    const type: string = Object.values(image)[1];
    const img = Object.values(data.data)[1];
    const arrayBufferView = new Uint8Array( img );
    const blob = new Blob([ arrayBufferView ], { type: type });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL( blob );

    return imageUrl;
}
