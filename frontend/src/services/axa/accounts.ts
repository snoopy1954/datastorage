import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Account, AccountNoID } from '../../../../backend/src/types/axa';

const getAll = async () => {
    const { data: accounts } = await axios.get<Account[]>(
        `${apiBaseUrl}/accounts`
    );

    return accounts;
}

const getOne = async (id: string) => {
    const { data: account } = await axios.get<Account>(
        `${apiBaseUrl}/accounts/${id}`
    );

    return account;
}

const create = async (account: AccountNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/accounts`,
        account
    );

    return response.data
}

const update = async (id: string, account: AccountNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/accounts/${id}`, 
        account
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/accounts/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
