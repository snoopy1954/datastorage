import { Binarydata } from '../../../../backend/src/types/basic';

export const getContent = async (file: File) => {
    const data: ArrayBuffer = await new Response(file).arrayBuffer();
    return data;
};

export const getImageUrl = (image: Binarydata): string => {
    const urlCreator = window.URL || window.webkitURL;
    const values = Object.values(image)[0];
    const type: string = values.type;
    const img: number = values.data;
    const arrayBuffer: Uint8Array = new Uint8Array(img);
    const blob: Blob = new Blob([ arrayBuffer ], { type: type });
    const imageUrl: string = urlCreator.createObjectURL(blob);

    return imageUrl;
};

// export const getImageUrlFrom Image = (image: Image): string => {
//     const urlCreator = window.URL || window.webkitURL;
//     const values = Object.values(image)[0];
//     const type: string = values.data.type;
//     const img: number = values.data.data;
//     const arrayBuffer: Uint8Array = new Uint8Array(img);
//     const blob: Blob = new Blob([ arrayBuffer ], { type: type });
//     const imageUrl: string = urlCreator.createObjectURL(blob);

//     return imageUrl;
// }

