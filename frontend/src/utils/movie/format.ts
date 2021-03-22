import { Format, FormatNoID } from '../../../../backend/src/types/basic';
import  { getAll, getOne, create, update, remove } from '../../services/movie/formats';


export const getAllFormatDB = async (): Promise<Format[]> => {
    return await getAll();
};

export const getOneFormatDB = async (id: string): Promise<Format> => {
    return await getOne(id);
};

export const createFormatDB = async (format: FormatNoID): Promise<Format> => {
    return await create(format);
};

export const updateFormatDB = async (format: Format): Promise<Format> => {
    return await update(format.id, format);
};

export const removeFormatDB = async (id: string): Promise<void> => {
    await remove(id);
};
