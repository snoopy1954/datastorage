import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Year, YearNoID } from '../../../../backend/src/types/basic';


const getAll = async () => {
    const { data: years } = await axios.get<Year[]>(
        `${apiBaseUrl}/accountyears`
    );

    return years;
}

const getOne = async (id: string) => {
    const { data: years } = await axios.get<Year>(
        `${apiBaseUrl}/accountyears/${id}`
    );

    return years;
}

const create = async (year: YearNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/accountyears`,
        year
    );

    return response.data
}

const update = async (id: string, year: YearNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/accountyears/${id}`, 
        year
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/accountyears/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
