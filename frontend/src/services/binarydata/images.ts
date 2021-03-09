import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from "../../constants";
import { Binarydata } from '../../../../backend/src/types/basic';

const getAll = async (type: string) => {
    const { data: images } = await axios.get<Binarydata[]>(
        `${apiBaseUrl}/binarydata?type=${type}`
    );

    return images;
}

const getOne = async (id: string, type: string) => {
    const { data: image } = await axios.get<Binarydata>(
        `${apiBaseUrl}/binarydata/${id}?type=${type}`
    );

    return image;
}

const create = async (filedata: ArrayBuffer, type: string) => {
    const url = `${apiBaseUrl}/binarydata?type=${type}`;
    const data: Uint8Array = new Uint8Array(filedata);
    console.log(url, data)
    const options: AxiosRequestConfig = {
        method: "POST",
        url,
        headers: { "content-type": "application/octet-stream" },
        data
    };
    const response = await axios(options);

    return response.data;
}

const update = async (id: string, filedata: ArrayBuffer, type: string) => {
    const url = `${apiBaseUrl}/binarydata/${id}?type=${type}`;
    const data: Uint8Array = new Uint8Array(filedata);
    const options: AxiosRequestConfig = {
        method: "PUT",
        url,
        headers: { "content-type": "application/octet-stream" },
        data
    };
    const response = await axios(options);

    return response.data
}

const remove = async (id: string, type: string) => {
    const url = `${apiBaseUrl}/binarydata/${id}?type=${type}`;

    let response;
    try {
        response = await axios.delete(url);
    }
    catch (e) {
        return ''
    }

    return response.data;
}

export { getAll, getOne, create, update, remove }
