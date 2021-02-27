import { Group, GroupNoID } from '../../../../../backend/src/types/basic';
import { 
    SET_MUSICGROUPS, 
    ADD_MUSICGROUP,
    UPDATE_MUSICGROUP,
    REMOVE_MUSICGROUP,
    DispatchSetMusicgroups,
    DispatchAddMusicgroup,
    DispatchUpdateMusicgroup,
    DispatchRemoveMusicgroup
} from './types';

import { create, update, remove, getAll } from "../../../services/music/group";

import { sortGroups } from '../../../utils/basic/group';


export const initializeMusicgroups = () => {
  return async (dispatch: DispatchSetMusicgroups) => {
    const groups = sortGroups(await getAll());
    dispatch({
      type: SET_MUSICGROUPS,
      payload: groups,
    });
  }
};

export const addMusicgroup = (group: GroupNoID) => {
  return async (dispatch: DispatchAddMusicgroup) => {
    const newMusicgroup = await create(group);
    dispatch({
      type: ADD_MUSICGROUP,
      payload: newMusicgroup
    });
  }
};

export const updateMusicgroup = (group: Group) => {
  return async (dispatch: DispatchUpdateMusicgroup) => {
    const newMusicgroup = await update(group.id, group);
    dispatch({
      type: UPDATE_MUSICGROUP,
      payload: newMusicgroup
    });
  }
};
  
export const removeMusicgroup = (id: string) => {
  return async (dispatch: DispatchRemoveMusicgroup) => {
    await remove(id);
    dispatch({
      type: REMOVE_MUSICGROUP,
      payload: id
    });
  }
};
