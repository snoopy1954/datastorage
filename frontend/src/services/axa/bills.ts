import axios from 'axios';
import { apiBaseUrl } from "../../constants";
import { Bill, BillNoID, Account } from '../../../../backend/src/types/axa';

import { getSum } from '../../utils/basic/basic';

const getAll = async () => {
    const { data: bills } = await axios.get<Bill[]>(
        `${apiBaseUrl}/bills`
    );

    return bills;
}

const getOne = async (id: string) => {
    const { data: bill } = await axios.get<Bill>(
        `${apiBaseUrl}/bills/${id}`
    );

    return bill;
}

const create = async (bill: BillNoID) => {
    const response = await axios.post<Bill>(
        `${apiBaseUrl}/bills`,
        bill
    );

    const { data: account } = await axios.get<Account>(
        `${apiBaseUrl}/accounts/${bill.accountID}`
    );

    account.billIDs.push(response.data.id);

    const amounts: string[] = [account.details[0].amount, bill.details[0].amount];
    account.details[0].amount = getSum(amounts);
    
    await axios.put(
        `${apiBaseUrl}/accounts/${account.id}`, 
        account
    );

    return response.data
}

const update = async (id: string, bill: BillNoID) => {
    const response = await axios.put(
        `${apiBaseUrl}/bills/${id}`, 
        bill
    );

    return response.data
}

const remove = async (id: string) => {
    const response = await axios.delete(
        `${apiBaseUrl}/bills/${id}`
    );

    return response.data
}

export { getAll, getOne, create, update, remove }
