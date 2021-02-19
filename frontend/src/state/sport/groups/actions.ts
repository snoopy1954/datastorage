import { Group, GroupNoID } from '../../../../../backend/src/types/basic';
import { 
    SET_SPORTGROUPS, 
    ADD_SPORTGROUP,
    UPDATE_SPORTGROUP,
    REMOVE_SPORTGROUP,
    DispatchSetSportgroups,
    DispatchAddSportgroup,
    DispatchUpdateSportgroup,
    DispatchRemoveSportgroup
} from './types';

import { create, update, remove, getAll } from "../../../services/sport/groups";

import { sortGroups } from '../../../utils/basic/group';


export const initializeSportgroups = () => {
  return async (dispatch: DispatchSetSportgroups) => {
    const groups = sortGroups(await getAll());
    dispatch({
      type: SET_SPORTGROUPS,
      payload: groups,
    });
  }
};

export const addSportgroup = (group: GroupNoID) => {
  return async (dispatch: DispatchAddSportgroup) => {
    const newSportgroup = await create(group);
    dispatch({
      type: ADD_SPORTGROUP,
      payload: newSportgroup
    });
  }
};

export const updateSportgroup = (group: Group) => {
  return async (dispatch: DispatchUpdateSportgroup) => {
    const newSportgroup = await update(group.id, group);
    dispatch({
      type: UPDATE_SPORTGROUP,
      payload: newSportgroup
    });
  }
};
  
export const removeSportgroup = (id: string) => {
  return async (dispatch: DispatchRemoveSportgroup) => {
    await remove(id);
    dispatch({
      type: REMOVE_SPORTGROUP,
      payload: id
    });
  }
};
