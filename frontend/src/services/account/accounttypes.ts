import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Accounttype, AccounttypeNoID } from '../../../../backend/src/types/account';

const getAll = async () => {
    const { data: accounttypes } = await axios.get<Accounttype[]>(
        `${apiBaseUrl}/accounttypes`
    );

    return accounttypes;
}

const getOne = async (id: string) => {
    const { data: accounttype } = await axios.get<Accounttype>(
        `${apiBaseUrl}/accounttypes/${id}`
    );

    return accounttype;
}

const create = async (accounttype: AccounttypeNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/accounttypes`,
        accounttype
    );

    return response.data
}

const update = async (id: string, accounttype: AccounttypeNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/accounttypes/${id}`, 
        accounttype
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/accounttypes/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
