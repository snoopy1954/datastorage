import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Bookgroup, BookgroupNoID } from '../../../../backend/src/types/book';

const getAll = async () => {
    const { data: bookgroups } = await axios.get<Bookgroup[]>(
        `${apiBaseUrl}/bookgroups`
    );

    return bookgroups;
}

const getOne = async (id: string) => {
    const { data: bookgroup } = await axios.get<Bookgroup>(
        `${apiBaseUrl}/bookgroups/${id}`
    );

    return bookgroup;
}

const create = async (bookgroup: BookgroupNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/bookgroups`,
        bookgroup
    );

    return response.data
}

const update = async (id: string, bookgroup: BookgroupNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/bookgroups/${id}`, 
        bookgroup
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/bookgroups/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
