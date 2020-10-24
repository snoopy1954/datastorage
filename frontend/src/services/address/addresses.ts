import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Address, AddressNoID } from "../../../../backend/src/types/addressTypes";

const getAll = async () => {
    const { data: addresss } = await axios.get<Address[]>(
        `${apiBaseUrl}/addresses`
    );

    return addresss;
}

const getOne = async (id: string) => {
    const { data: address } = await axios.get<Address>(
        `${apiBaseUrl}/addresses/${id}`
    );

    return address;
}

const create = async (address: AddressNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/addresses`,
        address
    );

    return response.data
}

const update = async (id: string, address: AddressNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/addresses/${id}`, 
        address
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/addresses/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
