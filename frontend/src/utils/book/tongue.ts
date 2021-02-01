import { Tongue, TongueNoID } from '../../../../backend/src/types/book';

export const newTongue = (): TongueNoID => {
    const tongue: TongueNoID = {
        name: "",
        seqnr: 0
    };

    return tongue;
};

export const nextTongue = (tongues: Tongue[]): TongueNoID => {
    const tongue: TongueNoID = {
        name: "",
        seqnr: nextSeqnr(tongues)
    };

    return tongue;
};

export const emptyTongue = (): Tongue => {
    const tongue: Tongue = {
        id: '',
        name: "",
        seqnr: 0
    };

    return tongue;
};

export const nextSeqnr = (tongues: Tongue[]): number => {
    let maxNumber = 0;
    Object.values(tongues).forEach(tongue => {
        if (tongue.seqnr >maxNumber) maxNumber = tongue.seqnr;
    });
    
    return maxNumber+1;
};

