import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Activity, ActivityNoID } from '../../../../backend/src/types/sport';

const getAll = async () => {
    const { data: activities } = await axios.get<Activity[]>(
        `${apiBaseUrl}/activities`
    );

    return activities;
}

const getOne = async (id: string) => {
    const { data: activity } = await axios.get<Activity>(
        `${apiBaseUrl}/activities/${id}`
    );

    return activity;
}

const create = async (activity: ActivityNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/activities`,
        activity
    );

    return response.data
}

const update = async (id: string, activity: ActivityNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/activities/${id}`, 
        activity
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/activities/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
