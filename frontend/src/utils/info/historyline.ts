import { Historyline, HistorylineNoID } from '../../../../backend/src/types/logging';

import { newName } from '../basic';

const sortItems = (a: Historyline, b: Historyline) => {
    const nameA = a.date.seqnr;
    const nameB = b.date.seqnr;
    if (nameA > nameB) {
        return -1;
    }
    if (nameA < nameB) {
        return 1;
    }
    return 0;
};

export const sortHistorylines = (historylines: Historyline[]) => {
    return (Object.values(historylines).sort(sortItems));
};

export const newHistoryline = (historylines: Historyline[]): HistorylineNoID => {
    const historyline = {
        date: {
            name: '',
            seqnr: nextSeqnr(historylines)+1
        },
        version: '',
        text: ''
    };

    return historyline;
};

export const emptyBiller = (): Historyline => {
    const historyline = {
        id: '',
        date: newName(),
        version: '',
        text: ''
    };

    return historyline;
};

export const nextSeqnr = (historylines: Historyline[]): number => {
    let maxNumber = 0;
    Object.values(historylines).forEach(historyline => {
        if (historyline.date.seqnr>maxNumber) maxNumber = historyline.date.seqnr;
    });
    
    return maxNumber;
};

