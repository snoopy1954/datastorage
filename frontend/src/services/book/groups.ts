import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Group, GroupNoID } from '../../../../backend/src/types/basic';

const getAll = async () => {
    const { data: bookgroups } = await axios.get<Group[]>(
        `${apiBaseUrl}/bookgroups`
    );

    return bookgroups;
}

const getOne = async (id: string) => {
    const { data: bookgroup } = await axios.get<Group>(
        `${apiBaseUrl}/bookgroups/${id}`
    );

    return bookgroup;
}

const create = async (bookgroup: GroupNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/bookgroups`,
        bookgroup
    );

    return response.data
}

const update = async (id: string, bookgroup: GroupNoID) => {
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
