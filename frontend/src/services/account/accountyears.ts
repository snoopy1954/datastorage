import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Accountyear, AccountyearNoID } from '../../../../backend/src/types/account';


const getAll = async () => {
    const { data: years } = await axios.get<Accountyear[]>(
        `${apiBaseUrl}/accountyears`
    );

    return years;
}

const getOne = async (id: string) => {
    const { data: accountyears } = await axios.get<Accountyear>(
        `${apiBaseUrl}/accountyears/${id}`
    );

    return accountyears;
}

const create = async (accountyear: AccountyearNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/accountyears`,
        accountyear
    );

    return response.data
}

const update = async (id: string, accountyear: AccountyearNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/accountyears/${id}`, 
        accountyear
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/accountyears/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
