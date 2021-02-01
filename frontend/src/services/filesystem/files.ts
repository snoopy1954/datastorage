import axios from 'axios';
import { apiBaseUrl } from "../../constants";


const getOne = async (folder: string, type: string) => {
    const url: string = type==='' ? `${apiBaseUrl}/files/${folder}` : `${apiBaseUrl}/files/${folder}?type=${type}`
    const { data: list } = await axios.get<string>(url);

    return list;
}

export { getOne }
