import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Year, YearNoID } from '../../../../backend/src/types/basic';


const getAll = async () => {
    const { data: years } = await axios.get<Year[]>(
        `${apiBaseUrl}/documentyears`
    );

    return years;
}

const getOne = async (id: string) => {
    const { data: years } = await axios.get<Year>(
        `${apiBaseUrl}/documentyears/${id}`
    );

    return years;
}

const create = async (year: YearNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/documentyears`,
        year
    );

    return response.data
}

const update = async (id: string, year: YearNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/documentyears/${id}`, 
        year
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/documentyears/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
