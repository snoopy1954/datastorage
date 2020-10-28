import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Device, DeviceNoID } from '../../../../backend/src/types/network';

const getAll = async () => {
    const { data: deviceListFromApi } = await axios.get<Device[]>(
        `${apiBaseUrl}/devices`
    );

    return deviceListFromApi;
}

const getOne = async (id: string) => {
    const { data: deviceFromApi } = await axios.get<Device>(
        `${apiBaseUrl}/devices/${id}`
    );

    return deviceFromApi;
}

const create = async (newObject: DeviceNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/devices`,
         newObject
    );

    return response.data
}

const update = async (id: string, newObject: DeviceNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/devices/${id}`, 
        newObject
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/devices/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
