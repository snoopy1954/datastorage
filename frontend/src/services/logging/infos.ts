import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Info, InfoNoID } from '../../../../backend/src/types/logging';


const getAll = async () => {
    const { data: infos } = await axios.get<Info[]>(
        `${apiBaseUrl}/infos`
    );

    return infos;
}

const create = async (info: InfoNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/infos`,
        info
    );

    return response.data
}


const update = async (id: string, info: Info) => {
    const response = await axios.put(
        `${apiBaseUrl}/infos/${id}`, 
        info
    );

    return response.data
}

export { getAll, create, update }
