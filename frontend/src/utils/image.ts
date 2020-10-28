import { Image } from '../../../backend/src/types/image';

export const getContent = async (file: File) => {
    const data: ArrayBuffer = await new Response(file).arrayBuffer();
    return data;
}

export const getImageUrl = (image: Image): string => {
    const urlCreator = window.URL || window.webkitURL;
    const values = Object.values(image)[0];
    const type: string = values.data.type;
    const img: number = values.data.data;
    const arrayBuffer: Uint8Array = new Uint8Array(img);
    const blob: Blob = new Blob([ arrayBuffer ], { type: type });
    const imageUrl: string = urlCreator.createObjectURL(blob);

    return imageUrl;
}

export const typedarrayToBuffer= (arr: Uint8Array): Buffer => {
        // eslint-disable-next-line no-undef
        let buf = Buffer.from(arr.buffer)
        if (arr.byteLength !== arr.buffer.byteLength) {
          // Respect the "view", i.e. byteOffset and byteLength, without doing a copy
          buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength)
        }
        return buf
}
