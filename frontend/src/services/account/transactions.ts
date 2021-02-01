import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Transaction, TransactionNoID } from '../../../../backend/src/types/account';

const getAll = async () => {
    const { data: transactions } = await axios.get<Transaction[]>(
        `${apiBaseUrl}/transactions`
    );

    return transactions;
}

const getOne = async (id: string) => {
    const { data: transaction } = await axios.get<Transaction>(
        `${apiBaseUrl}/transactions/${id}`
    );

    return transaction;
}

const create = async (transaction: TransactionNoID) => {
    const response = await axios.post(
        `${apiBaseUrl}/transactions`,
        transaction
    );

    return response.data
}

const update = async (id: string, transaction: TransactionNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/transactions/${id}`, 
        transaction
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/transactions/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
