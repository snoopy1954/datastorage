import { Details, Note } from '../../../../backend/src/types/axa';

import { Insurancetype } from '../../types/axa';


export const newDetails = (): Details => {
    const year = String(new Date().getFullYear());

    const details: Details = {
        insurancetype: Insurancetype.VITAL750,
        year: year,
        amount: '',
        refund: '',
        deny: '',
        retension: '',
        dent20: '',
        cure10: '',
    };

    return details;
};

export const newNote = (): Note => {
    const note: Note = {
        filename: '',
        filetype: '',
        filesize: '',
        dataId: '',
        received: ''
    }

    return note;
};
