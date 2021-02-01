import { Transaction } from '../../../../backend/src/types/account';
import { Accountfilter } from '../../types/account';

export const newAccountfilter = (): Accountfilter => {
    const filter: Accountfilter = {
        accountype: '',
        accountyear: '',
        person: ''
    }

    return filter;
};

export const transactionTitle = (filters: Accountfilter): string => {
    let filter = (filters.accountype!=="") ? ': ' + filters.accountype : '';
    filter += (filters.accountyear!=="") ? ' - ' + filters.accountyear : '';

    return filter;
};

export const transactionFilter = (transactions: Transaction[], filters: Accountfilter): Transaction[] => {
    let filteredTransactions = (filters.accountype!=="") ? Object.values(transactions).filter(transaction => transaction.accounttype===filters.accountype) : transactions;
    filteredTransactions = (filters.accountyear!=="") ? Object.values(filteredTransactions).filter(transaction => transaction.year===filters.accountyear) : filteredTransactions;
    const sortedTransactions  = (filters.person!=="") ? Object.values(filteredTransactions).filter(transaction => transaction.person.includes(filters.person)) : filteredTransactions;

    return sortedTransactions;
};

