import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Selection, SelectionNoID } from '../../../../backend/src/types/music';

const getAll = async () => {
    const { data: selections } = await axios.get<Selection[]>(
        `${apiBaseUrl}/selection`
    );

    return selections;
}

const getOne = async (id: string) => {
    const { data: selection } = await axios.get<Selection>(
        `${apiBaseUrl}/selection/${id}`
    );

    return selection;
}

const create = async (selection: SelectionNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/selection`,
        selection
    );

    return response.data
}

const update = async (id: string, selection: SelectionNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/selection/${id}`, 
        selection
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/selection/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
