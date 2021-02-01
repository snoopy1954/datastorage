import * as fs from 'fs';

import { TransactionNoID } from '../../types/account';

export const importCSVDiba = (filename: string): TransactionNoID[] => {
    const transactions: TransactionNoID[] = [];
    const transactionData = fs.readFileSync(filename, 'latin1');
    const transactionDataLines: string[] = transactionData.split('\n');
    transactionDataLines.forEach(transactionDataLine => {
        console.log(transactionDataLine);
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
        transactions.push(transaction);
    });

    return transactions;
};export const importCSVSparkasse = (filename: string): TransactionNoID[] => {
    const transactions: TransactionNoID[] = [];
    const transactionData = fs.readFileSync(filename, 'utf8');
    const transactionDataLines: string[] = transactionData.split('\n');
    transactionDataLines.forEach(transactionDataLine => {
        console.log(transactionDataLine);
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
        transactions.push(transaction);
    });

    return transactions;
};