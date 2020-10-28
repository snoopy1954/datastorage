import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Month, MonthNoID } from '../../../../backend/src/types/pressure';


const getAll = async () => {
    const { data: monthListFromApi } = await axios.get<Month[]>(
        `${apiBaseUrl}/months`
    );

    return monthListFromApi;
}

const getOne = async (id: string) => {
    const { data: monthFromApi } = await axios.get<Month>(
        `${apiBaseUrl}/months/${id}`
    );

    return monthFromApi;
}

const create = async (newObject: MonthNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/months`,
         newObject
    );

    return response.data
}

const update = async (id: string, newObject: MonthNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/months/${id}`, 
        newObject
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/months/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
