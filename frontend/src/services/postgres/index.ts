import axios from 'axios';
import { apiBaseUrl } from "../../constants";


const getAll = async (database: string, table: string) => {
    const url: string = table==='' ? `${apiBaseUrl}/postgres/${database}` : `${apiBaseUrl}/postgres?database=${database}&table=${table}&column=&id=`
    const { data: list } = await axios.get<string>(url);

    return list;
};

const getOne = async (database: string, table: string, column: string, id: string) => {
    const url: string = `${apiBaseUrl}/postgres?database=${database}&table=${table}&column=${column}&id=${id}`
    const { data: list } = await axios.get<string>(url);

    return list;
};

export { getAll, getOne }
