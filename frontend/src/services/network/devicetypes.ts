import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Devicetype, DevicetypeNoID } from '../../../../backend/src/types/network';

const getAll = async () => {
    const { data: devicetypeListFromApi } = await axios.get<Devicetype[]>(
        `${apiBaseUrl}/devicetypes`
    );

    return devicetypeListFromApi;
}

const getOne = async (id: string) => {
    const { data: deviceFromApi } = await axios.get<Devicetype>(
        `${apiBaseUrl}/devicetypes/${id}`
    );

    return deviceFromApi;
}

const create = async (newObject: DevicetypeNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/devicetypes`,
         newObject
    );

    return response.data
}

const update = async (id: string, newObject: DevicetypeNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/devicetypes/${id}`, 
        newObject
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/devicetypes/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
