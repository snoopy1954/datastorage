import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Moviegroup, MoviegroupNoID } from '../../../../backend/src/types/movie';

const getAll = async () => {
    const { data: moviegroups } = await axios.get<Moviegroup[]>(
        `${apiBaseUrl}/moviegroups`
    );

    return moviegroups;
}

const getOne = async (id: string) => {
    const { data: moviegroup } = await axios.get<Moviegroup>(
        `${apiBaseUrl}/moviegroups/${id}`
    );

    return moviegroup;
}

const create = async (moviegroup: MoviegroupNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/moviegroups`,
        moviegroup
    );

    return response.data
}

const update = async (id: string, moviegroup: MoviegroupNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/moviegroups/${id}`, 
        moviegroup
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/moviegroups/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
