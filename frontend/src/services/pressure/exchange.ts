import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Month, MonthNoID } from "../../types/pressure";

const getAll = async () => {
    const { data: monthListFromApi } = await axios.get<MonthNoID[]>(
        `${apiBaseUrl}/exchange`
    );

    return monthListFromApi;
}

const create = async (month: Month) => {
    const response = await axios.post(
        `${apiBaseUrl}/exchange`,
        month
    );

    return response.data;
}

export { getAll, create }
