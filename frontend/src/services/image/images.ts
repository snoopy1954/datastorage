import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from "../../constants";
import { Image } from "../../types/image";

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

const update = async (id: string, data: Uint8Array) => {
    const response = await axios.put(
        `${apiBaseUrl}/images/${id}`, 
        data
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/images/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
