import { Selection, SelectionNoID } from '../../../../backend/src/types/music';

import { getOne, create } from '../../services/music/selection';


export const getSelection = async (id: string): Promise<Selection> => {
    return await getOne(id);
};

export const createSelection = async (selection: SelectionNoID): Promise<Selection> => {
    return create(selection);
};

