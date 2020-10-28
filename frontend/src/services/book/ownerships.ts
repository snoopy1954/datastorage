import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Ownership, OwnershipNoID } from '../../../../backend/src/types/book';

const getAll = async () => {
    const { data: ownerships } = await axios.get<Ownership[]>(
        `${apiBaseUrl}/ownerships`
    );

    return ownerships;
}

const getOne = async (id: string) => {
    const { data: ownership } = await axios.get<Ownership>(
        `${apiBaseUrl}/ownerships/${id}`
    );

    return ownership;
}

const create = async (ownership: OwnershipNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/ownerships`,
        ownership
    );

    return response.data
}

const update = async (id: string, ownership: OwnershipNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/ownerships/${id}`, 
        ownership
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/ownerships/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
