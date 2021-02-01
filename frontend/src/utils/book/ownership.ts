import { Ownership, OwnershipNoID } from '../../../../backend/src/types/book';

export const newOwnership = (): OwnershipNoID => {
    const ownership: OwnershipNoID = {
        name: "",
        seqnr: 0
    };

    return ownership;
};

export const nextOwnership = (ownerships: Ownership[]): OwnershipNoID => {
    const ownership: OwnershipNoID = {
        name: "",
        seqnr: nextSeqnr(ownerships)
    };

    return ownership;
};

export const emptyOwnership = (): Ownership => {
    const ownership: Ownership = {
        id: '',
        name: "",
        seqnr: 0
    };

    return ownership;
};

export const nextSeqnr = (ownerships: Ownership[]): number => {
    let maxNumber = 0;
    Object.values(ownerships).forEach(ownership => {
        if (ownership.seqnr >maxNumber) maxNumber = ownership.seqnr;
    });
    
    return maxNumber+1;
};

