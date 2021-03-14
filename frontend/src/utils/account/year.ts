import { Year, YearNoID } from '../../../../backend/src/types/basic';
import  { getAll, getOne, create, update, remove } from '../../services/account/years';


export const getAllYearDB = async (): Promise<Year[]> => {
    return await getAll();
};

export const getOneYearDB = async (id: string): Promise<Year> => {
    return await getOne(id);
};

export const createYearDB = async (year: YearNoID): Promise<Year> => {
    return await create(year);
};

export const updateYearDB = async (year: Year): Promise<Year> => {
    return await update(year.id, year);
};

export const removeYearDB = async (id: string): Promise<void> => {
    await remove(id);
};
