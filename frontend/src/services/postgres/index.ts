import axios from 'axios';
import { apiBaseUrl } from "../../constants";


const getAll = async (folder: string, type: string) => {
    const url: string = type==='' ? `${apiBaseUrl}/postgres` : `${apiBaseUrl}/postgres?type=${type}`
    const { data: list } = await axios.get<string>(url);

    return list;
};

const getOne = async (folder: string, type: string) => {
    const url: string = type==='' ? `${apiBaseUrl}/postgres/${folder}` : `${apiBaseUrl}/postgres/${folder}?type=${type}`
    const { data: list } = await axios.get<string>(url);

    return list;
};

export { getAll, getOne }
