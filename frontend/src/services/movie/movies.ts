import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Movie, MovieNoID } from '../../../../backend/src/types/movie';

const getAll = async () => {
    const { data: movies } = await axios.get<Movie[]>(
        `${apiBaseUrl}/movies`
    );

    return movies;
}

const getOne = async (id: string) => {
    const { data: movie } = await axios.get<Movie>(
        `${apiBaseUrl}/movies/${id}`
    );

    return movie;
}

const create = async (movie: MovieNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/movies`,
        movie
    );

    return response.data
}

const update = async (id: string, movie: MovieNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/movies/${id}`, 
        movie
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/movies/${id}`
    );

    return response.data
}



export { getAll, getOne, create, update, remove }
