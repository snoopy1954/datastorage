import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from "../../constants";
import { Image } from '../../../../backend/src/types/image';
import { Content } from '../../../../backend/src/types/book';
import { getContent } from '../../utils/image';

const getAll = async () => {
    const { data: images } = await axios.get<Image[]>(
        `${apiBaseUrl}/images`
    );

    return images;
}

const getOne = async (id: string) => {
    const { data: image } = await axios.get<Image>(
        `${apiBaseUrl}/images/${id}`
    );

    return image;
}

const create = async (data: Uint8Array) => {
    const options: AxiosRequestConfig = {
        method: "POST",
        url: `${apiBaseUrl}/images`,
        headers: { "content-type": "application/octet-stream" },
        data
    };
    const response = await axios(options);
    
    return response.data
}

const create2 = async (file: File) => {
    const filedata: ArrayBuffer = await getContent(file);
    const data: Uint8Array = new Uint8Array(filedata);
    const options: AxiosRequestConfig = {
        method: "POST",
        url: `${apiBaseUrl}/images`,
        headers: { "content-type": "application/octet-stream" },
        data
    };
    let response = await axios(options);
    const id = response.data.id;
    const content: Content = {
        filename: file.name,
        filetype: file.type,
        filesize: String(file.size),
        dataId: id
    }

    response = await axios.put(
        `${apiBaseUrl}/images/${id}`, 
        content
    );

    return content
}

const update = async (id: string, content: Content) => {
    const response = await axios.put(
        `${apiBaseUrl}/images/${id}`, 
        content
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/images/${id}`
    );

    return response.data
}

export { getAll, getOne, create, create2, update, remove }
