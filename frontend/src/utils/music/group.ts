import { Group, GroupNoID } from '../../../../backend/src/types/basic';
import  { getAll, getOne, create, update, remove } from '../../services/music/group';


export const getAllDB = async (): Promise<Group[]> => {
    return await getAll();
};

export const getOneDB = async (id: string): Promise<Group> => {
    return await getOne(id);
};

export const createDB = async (group: GroupNoID): Promise<Group> => {
    return await create(group);
};

export const updateDB = async (group: Group): Promise<Group> => {
    return await update(group.id, group);
};

export const removeDB = async (id: string): Promise<void> => {
    await remove(id);
};
