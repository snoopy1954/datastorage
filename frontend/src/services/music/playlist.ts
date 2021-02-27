import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Playlist, PlaylistNoID } from '../../../../backend/src/types/music';

const getAll = async () => {
    const { data: playlists } = await axios.get<Playlist[]>(
        `${apiBaseUrl}/playlist`
    );

    return playlists;
}

const getOne = async (id: string) => {
    const { data: playlist } = await axios.get<Playlist>(
        `${apiBaseUrl}/playlist/${id}`
    );

    return playlist;
}

const create = async (playlist: PlaylistNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/playlist`,
        playlist
    );

    return response.data
}

const update = async (id: string, playlist: PlaylistNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/playlist/${id}`, 
        playlist
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/playlist/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
