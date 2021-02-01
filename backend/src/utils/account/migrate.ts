/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as fs from "fs";

import { TransactionNoID } from '../../types/account';

const getAccounttype = (konto: string): string => {
    let accounttype = '';

    switch (konto) {
        case 'DE71500105175420096629':
            accounttype = 'Diba Giro';
            break;
        case 'DE09763500000000134763':
        case '134763':
        case '':
            accounttype = 'Sparkasse Giro';
            break;
        default:
    }

    return accounttype;
};

export const importPG = (filename: string): TransactionNoID[] => {
    const transactions: TransactionNoID[] = [];
    const transactionData = fs.readFileSync(filename, 'utf8');
    const transactionDataLines: string[] = transactionData.split('\n');
    transactionDataLines.forEach(transactionDataLine => {
        const transactionparts: string[] = transactionDataLine.split('\t');
        if (transactionparts.length===15) {
            const name: string = 'Buchung #' + transactionparts[0];
            const seqnr: number = +transactionparts[0];
            const date: string = transactionparts[1].replace(/-/g, '');
            const year: string = date.length===8 ? date.substr(0,4) : '';
            const month: string = date.length===8 ? date.substr(4,2) : '';
            const checksum: string = transactionparts[2];
            const accounttype: string = getAccounttype(transactionparts[3]);
            const text: string = transactionparts[6];
            const purpose: string = transactionparts[7];
            const person: string = transactionparts[8];
            const iban: string = transactionparts[9];
            const bic: string = transactionparts[10];
            const value: string = transactionparts[11];
            const currency: string = transactionparts[12];
            const info: string = transactionparts[13];
            const balance: string = transactionparts[14];
            if (year==='') console.log(transactionDataLine);
            const transaction: TransactionNoID = {
                name,
                seqnr,
                date,
                year,
                month,
                checksum,
                accounttype,
                text,
                purpose,
                person,
                iban,
                bic,
                value,
                currency,
                info,
                balance
            };
            transactions.push(transaction);
        }
    });

    return transactions;
};

