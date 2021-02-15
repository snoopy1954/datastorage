import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from "../../constants";
import { Binarydata } from '../../../../backend/src/types/image';
import { getContent } from '../../utils/binarydata/binarydata';

const getAll = async () => {
    const { data: images } = await axios.get<Binarydata[]>(
        `${apiBaseUrl}/binarydata`
    );

    return images;
}

const getOne = async (id: string) => {
    const { data: image } = await axios.get<Binarydata>(
        `${apiBaseUrl}/binarydata/${id}`
    );

    return image;
}

const create = async (file: File) => {
    const filedata: ArrayBuffer = await getContent(file);
    const data: Uint8Array = new Uint8Array(filedata);
    const options: AxiosRequestConfig = {
        method: "POST",
        url: `${apiBaseUrl}/binarydata`,
        headers: { "content-type": "application/octet-stream" },
        data
    };
    const response = await axios(options);

    return response.data;
}

const remove = async (id: string) => {
    let response;
    try {
        response = await axios.delete(
        `${apiBaseUrl}/binarydata/${id}`
        );
    }
    catch (e) {
        return ''
    }

    return response.data;
}

export { getAll, getOne, create, remove }
