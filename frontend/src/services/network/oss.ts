import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Os, OsNoID } from '../../../../backend/src/types/network';

const getAll = async () => {
    const { data: osListFromApi } = await axios.get<Os[]>(
        `${apiBaseUrl}/oss`
    );

    return osListFromApi;
}

const getOne = async (id: string) => {
    const { data: osFromApi } = await axios.get<Os>(
        `${apiBaseUrl}/oss/${id}`
    );

    return osFromApi;
}

const create = async (newObject: OsNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/oss`,
         newObject
    );

    return response.data
}
  
const update = async (id: string, newObject: OsNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/oss/${id}`, 
        newObject
    );

    return response.data
}
  
const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/oss/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
  