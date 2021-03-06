import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Group, GroupNoID } from '../../../../backend/src/types/basic';

const getAll = async () => {
    const { data: groups } = await axios.get<Group[]>(
        `${apiBaseUrl}/addressgroups`
    );

    return groups;
}

const getOne = async (id: string) => {
    const { data: group } = await axios.get<Group>(
        `${apiBaseUrl}/addressgroups/${id}`
    );

    return group;
}

const create = async (group: GroupNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/addressgroups`,
        group
    );

    return response.data
}

const update = async (id: string, group: GroupNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/addressgroups/${id}`, 
        group
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/addressgroups/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
