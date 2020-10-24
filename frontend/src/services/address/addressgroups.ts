import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Addressgroup, AddressgroupNoID } from "../../../../backend/src/types/addressTypes";

const getAll = async () => {
    const { data: addressgroups } = await axios.get<Addressgroup[]>(
        `${apiBaseUrl}/addressgroups`
    );

    return addressgroups;
}

const getOne = async (id: string) => {
    const { data: addressgroup } = await axios.get<Addressgroup>(
        `${apiBaseUrl}/addressgroups/${id}`
    );

    return addressgroup;
}

const create = async (addressgroup: AddressgroupNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/addressgroups`,
        addressgroup
    );

    return response.data
}

const update = async (id: string, addressgroup: AddressgroupNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/addressgroups/${id}`, 
        addressgroup
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/addressgroups/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
