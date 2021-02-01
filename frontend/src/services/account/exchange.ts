import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { TransactionNoID } from '../../../../backend/src/types/account';

const getAll = async () => {
    const { data: transactionsFromApi } = await axios.get<TransactionNoID[]>(
        `${apiBaseUrl}/kontoPG`
    );

    return transactionsFromApi;
}

export { getAll }
