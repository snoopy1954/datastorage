import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Artist, ArtistNoID } from '../../../../backend/src/types/music';

const getAll = async () => {
    const { data: artists } = await axios.get<Artist[]>(
        `${apiBaseUrl}/artist`
    );

    return artists;
}

const getOne = async (id: string) => {
    const { data: artist } = await axios.get<Artist>(
        `${apiBaseUrl}/artist/${id}`
    );

    return artist;
}

const create = async (artist: ArtistNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/artist`,
        artist
    );

    return response.data
}

const update = async (id: string, artist: ArtistNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/artist/${id}`, 
        artist
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/artist/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
