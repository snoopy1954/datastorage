import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Month, MonthNoID } from '../../../../backend/src/types/pressure';

const getAll = async () => {
    const { data: monthListFromApi } = await axios.get<MonthNoID[]>(
        `${apiBaseUrl}/exchange`
    );

    return monthListFromApi;
}

const create = async (month: Month, type: string) => {
    const response = await axios.post(
        `${apiBaseUrl}/exchange?type=${type}`,
        month
    );

    return response.data;
}

export { getAll, create }
