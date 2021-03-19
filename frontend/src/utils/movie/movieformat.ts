import { Format, FormatNoID } from '../../../../backend/src/types/basic';

import { newName } from '../basic/basic';

export const newFormat = (): FormatNoID => {
    const movieformat: FormatNoID = newName();

    return movieformat;
};

export const emptyFormat = (): Format => {
    const movieformat: Format = {
        id: '',
        name: newName().name,
        seqnr: newName().seqnr
    }
    return movieformat;
};

