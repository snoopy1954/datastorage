import { Biller, BillerNoID } from '../../../../backend/src/types/axa';

import { newName } from '../basic/basic';

const sortBillers = (a: Biller, b: Biller) => {
    const nameA = a.name.seqnr;
    const nameB = b.name.seqnr;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

export const sortBillerList = (billers: Biller[]) => {
    return Object.values(billers).sort(sortBillers);
};

export const newBiller = (billers: Biller[]): BillerNoID => {
    const biller = {
        name: {
            name: '',
            seqnr: nextSeqnr(billers)+1
        },
        person: ''
    };

    return biller;
};

export const emptyBiller = (): Biller => {
    const biller = {
        id: '',
        name: newName(),
        person: ''
    };

    return biller;
};

export const nextSeqnr = (billers: Biller[]): number => {
    let maxNumber = 0;
    Object.values(billers).forEach(biller => {
        if (biller.name.seqnr>maxNumber) maxNumber = biller.name.seqnr;
    });
    
    return maxNumber;
};

