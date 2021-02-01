import { Bookgroup, BookgroupNoID } from '../../../../backend/src/types/book';


export const newBookgroup = (): BookgroupNoID => {
    const bookgroup: BookgroupNoID = {
        name: "",
        seqnr: 0,
        subgroups: []
    };

    return bookgroup;
};

export const nextBookgroup = (bookgroups: Bookgroup[]): BookgroupNoID => {
    const bookgroup: BookgroupNoID = {
        name: "",
        seqnr: nextSeqnr(bookgroups),
        subgroups: []
    };

    return bookgroup;
};

export const emptyBookgroup = (): Bookgroup => {
    const bookgroup: Bookgroup = {
        id: '',
        name: "",
        seqnr: 0,
        subgroups: []
    };

    return bookgroup;
};

export const nextSeqnr = (bookgroups: Bookgroup[]): number => {
    let maxNumber = 0;
    Object.values(bookgroups).forEach(bookgroup => {
        if (bookgroup.seqnr >maxNumber) maxNumber = bookgroup.seqnr;
    });
    
    return maxNumber+1;
};