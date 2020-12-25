import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Biller, BillerNoID } from '../../../../backend/src/types/axa';

const getAll = async () => {
    const { data: billers } = await axios.get<Biller[]>(
        `${apiBaseUrl}/billers`
    );

    return billers;
}

const getOne = async (id: string) => {
    const { data: biller } = await axios.get<Biller>(
        `${apiBaseUrl}/billers/${id}`
    );

    return biller;
}

const create = async (biller: BillerNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/billers`,
        biller
    );

    return response.data
}

const update = async (id: string, biller: BillerNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/billers/${id}`, 
        biller
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/billers/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
