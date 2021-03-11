import { Group, GroupNoID } from '../../../../../backend/src/types/basic';
import { 
    SET_RECIPEGROUPS, 
    ADD_RECIPEGROUP,
    UPDATE_RECIPEGROUP,
    REMOVE_RECIPEGROUP,
    EXCHANGE_RECIPEGROUPS,
    DispatchSetRecipegroups,
    DispatchAddRecipegroup,
    DispatchUpdateRecipegroup,
    DispatchRemoveRecipegroup
} from './types';

import { create, update, remove, getAll } from "../../../services/recipe/groups";

import { sortGroups } from '../../../utils/basic/group';


export const initializeRecipegroups = () => {
  return async (dispatch: DispatchSetRecipegroups) => {
    const groups = sortGroups(await getAll());
    dispatch({
      type: SET_RECIPEGROUPS,
      payload: groups,
    });
  }
};

export const addRecipegroup = (group: GroupNoID) => {
  return async (dispatch: DispatchAddRecipegroup) => {
    const newRecipegroup = await create(group);
    dispatch({
      type: ADD_RECIPEGROUP,
      payload: newRecipegroup
    });
  }
};

export const updateRecipegroup = (group: Group) => {
  return async (dispatch: DispatchUpdateRecipegroup) => {
    const newRecipegroup = await update(group.id, group);
    dispatch({
      type: UPDATE_RECIPEGROUP,
      payload: newRecipegroup
    });
  }
};
  
export const removeRecipegroup = (id: string) => {
  return async (dispatch: DispatchRemoveRecipegroup) => {
    await remove(id);
    dispatch({
      type: REMOVE_RECIPEGROUP,
      payload: id
    });
  }
};

export const exchangeRecipegroups = (groups: Group[]) => {
  const action = 
    {
      type: EXCHANGE_RECIPEGROUPS,
      payload: groups,
    }
        
    return action;  
};

