import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Tongue, TongueNoID } from "../../types/book";

const getAll = async () => {
    const { data: tongues } = await axios.get<Tongue[]>(
        `${apiBaseUrl}/tongues`
    );

    return tongues;
}

const getOne = async (id: string) => {
    const { data: tongue } = await axios.get<Tongue>(
        `${apiBaseUrl}/tongues/${id}`
    );

    return tongue;
}

const create = async (tongue: TongueNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/tongues`,
        tongue
    );

    return response.data
}

const update = async (id: string, tongue: TongueNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/tongues/${id}`, 
        tongue
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/tongues/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
