import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Cd, CdNoID } from '../../../../backend/src/types/music';

const getAll = async () => {
    const { data: cds } = await axios.get<Cd[]>(
        `${apiBaseUrl}/cd`
    );

    return cds;
}

const getOne = async (id: string) => {
    const { data: cd } = await axios.get<Cd>(
        `${apiBaseUrl}/cd/${id}`
    );

    return cd;
}

const create = async (cd: CdNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/cd`,
        cd
    );

    return response.data
}

const update = async (id: string, cd: CdNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/cd/${id}`, 
        cd
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/cd/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
