import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Track, TrackNoID } from '../../../../backend/src/types/music';

const getAll = async () => {
    const { data: tracks } = await axios.get<Track[]>(
        `${apiBaseUrl}/track`
    );

    return tracks;
}

const getOne = async (id: string) => {
    const { data: track } = await axios.get<Track>(
        `${apiBaseUrl}/track/${id}`
    );

    return track;
}

const create = async (track: TrackNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/track`,
        track
    );

    return response.data
}

const update = async (id: string, track: TrackNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/track/${id}`, 
        track
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/track/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
