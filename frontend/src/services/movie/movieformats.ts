import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Format, FormatNoID } from '../../../../backend/src/types/basic';

const getAll = async () => {
    const { data: formats } = await axios.get<Format[]>(
        `${apiBaseUrl}/movieformats`
    );

    return formats;
}

const getOne = async (id: string) => {
    const { data: format } = await axios.get<Format>(
        `${apiBaseUrl}/movieformats/${id}`
    );

    return format;
}

const create = async (format: FormatNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/movieformats`,
        format
    );

    return response.data
}

const update = async (id: string, format: FormatNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/movieformats/${id}`, 
        format
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/movieformats/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
