import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Historyline, HistorylineNoID } from '../../../../backend/src/types/logging';

const getAll = async () => {
    const { data: historylines } = await axios.get<Historyline[]>(
        `${apiBaseUrl}/historylines`
    );

    return historylines;
}

const getOne = async (id: string) => {
    const { data: historyline } = await axios.get<Historyline>(
        `${apiBaseUrl}/historylines/${id}`
    );

    return historyline;
}

const create = async (historyline: HistorylineNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/historylines`,
        historyline
    );

    return response.data
}

const update = async (id: string, historyline: HistorylineNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/historylines/${id}`, 
        historyline
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/historylines/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
