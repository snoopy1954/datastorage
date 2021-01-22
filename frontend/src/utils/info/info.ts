import { Info } from '../../../../backend/src/types/logging';

export const emptyInfo = (): Info => {
    const info = {
        id: '',
        date: '',
        version: '',
    };

    return info;
};
