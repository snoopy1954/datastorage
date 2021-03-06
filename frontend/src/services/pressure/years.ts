import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Year, YearNoID } from '../../../../backend/src/types/pressure';


const getAll = async () => {
    const { data: years } = await axios.get<Year[]>(
        `${apiBaseUrl}/pressureyears`
    );

    return years;
}

const getOne = async (id: string) => {
    const { data: year } = await axios.get<Year>(
        `${apiBaseUrl}/pressureyears/${id}`
    );

    return year;
}

const create = async (year: YearNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/pressureyears`,
         year
    );

    return response.data
}

const update = async (id: string, year: YearNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/pressureyears/${id}`, 
        year
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/pressureyears/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
