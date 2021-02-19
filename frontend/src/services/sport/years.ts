import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Year, YearNoID } from '../../../../backend/src/types/basic';


const getAll = async () => {
    const { data: years } = await axios.get<Year[]>(
        `${apiBaseUrl}/sportyears`
    );

    return years;
}

const getOne = async (id: string) => {
    const { data: years } = await axios.get<Year>(
        `${apiBaseUrl}/sportyears/${id}`
    );

    return years;
}

const create = async (year: YearNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/sportyears`,
        year
    );

    return response.data
}

const update = async (id: string, year: YearNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/sportyears/${id}`, 
        year
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/sportyears/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
