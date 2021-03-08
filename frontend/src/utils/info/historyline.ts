import { Historyline, HistorylineNoID } from '../../../../backend/src/types/logging';

import { newName, getCurrentDate } from '../basic/basic';

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
            name: getCurrentDate(),
            seqnr: nextSeqnr(historylines)[0]
        },
        version: nextSeqnr(historylines)[1],
        text: ''
    };

    return historyline;
};

export const emptyHistoryline = (): Historyline => {

    const historyline = {
        id: '',
        date: {
            name: getCurrentDate(),
            seqnr: 0
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

export const nextSeqnr = (historylines: Historyline[]): [number, string] => {
    let maxVersion = '';
    let maxSeqnr = 0;
    Object.values(historylines).forEach(historyline => {
        if (historyline.date.seqnr>maxSeqnr) {
            maxSeqnr = historyline.date.seqnr;
            maxVersion = historyline.version;
        }
    });

    const seqnr = maxSeqnr+1;
    let version: string = '';
    const versionParts: string[] = maxVersion.split('.');
    if (versionParts.length===2) {
        const subVersion: number = (+versionParts[1]+1);
        version = versionParts[0] + '.' + (String(subVersion).length===1 ? '0' + String(subVersion) : String(subVersion));
    }

    return [seqnr, version];
};

