import { MD5 } from 'crypto-js';

import { Transaction, TransactionNoID, Accounttype } from '../../../../backend/src/types/account';
import { Filter } from '../../types/account';

import { getCurrentDate, getSum } from '../basic/basic';


export const newTransaction = (): TransactionNoID => {
    const transaction: TransactionNoID = {
        name: '',
        seqnr: 0,
        checksum: '',
        accounttype: '',
        date: '',
        year: '',
        month: '',
        text: '',
        purpose: '',
        person: '',
        iban: '',
        bic: '',
        value: '',
        currency: '',
        info: '',
        balance: ''
    };

    return transaction;
};

export const nextTransaction = (transactions: Transaction[]): TransactionNoID => {
    const currentdate: string = getCurrentDate();

    const transaction: TransactionNoID = {
        name: "Buchung #" + nextSeqnr(transactions),
        seqnr: nextSeqnr(transactions),
        checksum: '',
        accounttype: '',
        date: currentdate,
        year: currentdate.substr(6,4),
        month: currentdate.substr(3,2),
        text: '',
        purpose: '',
        person: '',
        iban: '',
        bic: '',
        value: '',
        currency: '',
        info: '',
        balance: ''
    };

    return transaction;
};

export const emptyTransaction = (): Transaction => {
    const transaction: Transaction = {
        id: '',
        name: '',
        seqnr: 0,
        checksum: '',
        accounttype: '',
        date: '',
        year: '',
        month: '',
        text: '',
        purpose: '',
        person: '',
        iban: '',
        bic: '',
        value: '',
        currency: '',
        info: '',
        balance: ''
    }
    return transaction;
};

export const nextSeqnr = (transactions: Transaction[]): number => {
    let maxNumber = 0;
    Object.values(transactions).forEach(transaction => {
        if (transaction.seqnr >maxNumber) maxNumber = transaction.seqnr;
    });
    
    return maxNumber+1;
};

const sortTransactionlist = (a: Transaction, b: Transaction) => {
    const nameA = a.seqnr;
    const nameB = b.seqnr;
    if (nameA > nameB) {
        return -1;
    }
    if (nameA < nameB) {
        return 1;
    }
    return 0;
};
  
export const sortTransactions = (years: Transaction[]) => {
    return years.sort(sortTransactionlist);
};
  
export const getTransactionsFromCSV = (content: string, accounttype: Accounttype, transactions: Transaction[]): TransactionNoID[] => {
    let newTransactions: TransactionNoID[] = [];
    const seqnr: number = nextSeqnr(transactions);

    switch (accounttype.bic) {
        case 'BYLADEM1ERH':
            newTransactions = getSparkasseTransactions(content, seqnr, accounttype);
            break;
        case 'INGDDEFFXXX':
            newTransactions = getDibaTransactions(content, seqnr, accounttype);
            break;
        default:
    }
    
    return newTransactions;
};

const getDibaTransactions = (content: string, seqnr: number, accounttype: Accounttype): TransactionNoID[] => {
    const transactions: TransactionNoID[] = [];

    const datalines: string[] = content.split('\n');
    const transactionlines = datalines
        .filter(line => line.split(';').length===9)
        .filter(line => !line.startsWith('Buchung'));
    for (let index = transactionlines.length-1; index > -1; index--) {
        const checksum: string = MD5(transactionlines[index]).toString();
        const parts: string[] = transactionlines[index].split(';');
        let date: string = parts[0];
        const year: string = date.substr(6);
        const month: string = date.substr(3,2);
        const day: string = date.substr(0,2);
        date = year + month + day;
        const transaction: TransactionNoID = {
            name: "Buchung #" + seqnr,
            seqnr,
            checksum,
            accounttype: accounttype.name,
            date,
            year,
            month,
            text: parts[3],
            purpose: parts[4],
            person: parts[2],
            iban: '',
            bic: '',
            value: parts[7],
            currency: parts[8],
            info: '',
            balance: parts[5].replace('.','')
        }
        seqnr++;
        transactions.push(transaction);
    }
    return transactions;
};

const getSparkasseTransactions = (content: string, seqnr: number, accounttype: Accounttype): TransactionNoID[] => {
    const transactions: TransactionNoID[] = [];
    let balance = accounttype.balance;

    const datalines: string[] = content.split('\n');
    const transactionlines = datalines
        .filter(line => line.split(';').length===11)
        .filter(line => !line.startsWith('"Auftragskonto"'))
        .filter(line => !line.includes('Umsatz vorgemerkt'));
    for (let index = transactionlines.length-1; index > -1; index--) {
        const checksum: string = MD5(transactionlines[index]).toString();
        const parts: string[] = transactionlines[index].split(';');
        let date: string = parts[2];
        const year: string = '20' + date.substr(7,2);
        const month: string = date.substr(4,2);
        const day: string = date.substr(1,2);
        const value: string = parts[8].substr(1, parts[8].length-2);
        date = year + month + day;
        balance = getSum([balance, value]);
        const transaction: TransactionNoID = {
            name: "Buchung #" + seqnr,
            seqnr,
            checksum,
            accounttype: accounttype.name,
            date,
            year,
            month,
            text: parts[3].substr(1, parts[3].length-2),
            purpose: parts[4].substr(1, parts[4].length-2),
            person: parts[5].substr(1, parts[5].length-2),
            iban: parts[6].substr(1, parts[6].length-2),
            bic: parts[7].substr(1, parts[7].length-2),
            value,
            currency: parts[9].substr(1, parts[9].length-2),
            info: parts[10].substr(1, parts[10].length-2),
            balance
        }
        seqnr++;
        transactions.push(transaction);
    }

    return transactions;
};

export const findChecksum = (transactions: Transaction[], checksum: string): boolean => {
    let found: boolean = false;
    Object.values(transactions).forEach(transaction => {
        if (transaction.checksum===checksum) found = true;
    });

    return found;
};

export const newFilter = (): Filter => {
    const filter: Filter = {
        accountype: '',
        year: '',
        person: ''
    }

    return filter;
};

export const transactionTitle = (filter: Filter): string => {
    let title = (filter.accountype!=="") ? ': ' + filter.accountype : '';
    title += (filter.year!=="") ? ' - ' + filter.year : '';

    return title;
};

export const transactionFilter = (transactions: Transaction[], filter: Filter): Transaction[] => {
    let filteredTransactions = (filter.accountype!=="") ? Object.values(transactions).filter(transaction => transaction.accounttype===filter.accountype) : transactions;
    filteredTransactions = (filter.year!=="") ? Object.values(filteredTransactions).filter(transaction => transaction.year===filter.year) : filteredTransactions;
    const sortedTransactions  = (filter.person!=="") ? Object.values(filteredTransactions).filter(transaction => transaction.person.includes(filter.person)) : filteredTransactions;

    return sortedTransactions;
};

