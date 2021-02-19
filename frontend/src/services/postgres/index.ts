import axios from 'axios';
import { apiBaseUrl } from "../../constants";


const getAll = async (database: string, table: string) => {
    const url: string = table==='' ? `${apiBaseUrl}/postgres/${database}` : `${apiBaseUrl}/postgres?database=${database}&table=${table}`
    const { data: list } = await axios.get<string>(url);

    return list;
};

export { getAll }
