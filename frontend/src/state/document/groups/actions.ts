import { Group, GroupNoID } from '../../../../../backend/src/types/basic';
import { 
    SET_DOCUMENTGROUPS, 
    ADD_DOCUMENTGROUP,
    UPDATE_DOCUMENTGROUP,
    REMOVE_DOCUMENTGROUP,
    EXCHANGE_DOCUMENTGROUPS,
    DispatchSetDocumentgroups,
    DispatchAddDocumentgroup,
    DispatchUpdateDocumentgroup,
    DispatchRemoveDocumentgroup
} from './types';

import { create, update, remove, getAll } from "../../../services/document/groups";

import { sortGroups } from '../../../utils/basic/group';


export const initializeDocumentgroups = () => {
  return async (dispatch: DispatchSetDocumentgroups) => {
    const groups = sortGroups(await getAll());
    dispatch({
      type: SET_DOCUMENTGROUPS,
      payload: groups,
    });
  }
};

export const addDocumentgroup = (group: GroupNoID) => {
  return async (dispatch: DispatchAddDocumentgroup) => {
    const newDocumentgroup = await create(group);
    dispatch({
      type: ADD_DOCUMENTGROUP,
      payload: newDocumentgroup
    });
  }
};

export const updateDocumentgroup = (group: Group) => {
  return async (dispatch: DispatchUpdateDocumentgroup) => {
    const newDocumentgroup = await update(group.id, group);
    dispatch({
      type: UPDATE_DOCUMENTGROUP,
      payload: newDocumentgroup
    });
  }
};
  
export const removeDocumentgroup = (id: string) => {
  return async (dispatch: DispatchRemoveDocumentgroup) => {
    await remove(id);
    dispatch({
      type: REMOVE_DOCUMENTGROUP,
      payload: id
    });
  }
};

export const exchangeDocumentgroups = (groups: Group[]) => {
  const action = 
    {
      type: EXCHANGE_DOCUMENTGROUPS,
      payload: groups,
    }
        
    return action;  
};

