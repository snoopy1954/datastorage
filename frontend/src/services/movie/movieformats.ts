import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Movieformat, MovieformatNoID } from '../../../../backend/src/types/movie';

const getAll = async () => {
    const { data: movieformats } = await axios.get<Movieformat[]>(
        `${apiBaseUrl}/movieformats`
    );

    return movieformats;
}

const getOne = async (id: string) => {
    const { data: movieformat } = await axios.get<Movieformat>(
        `${apiBaseUrl}/movieformats/${id}`
    );

    return movieformat;
}

const create = async (movieformat: MovieformatNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/movieformats`,
        movieformat
    );

    return response.data
}

const update = async (id: string, movieformat: MovieformatNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/movieformats/${id}`, 
        movieformat
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/movieformats/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
