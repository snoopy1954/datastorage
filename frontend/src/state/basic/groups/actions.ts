import { Group } from '../../../../../backend/src/types/basic';
import { SET_GROUPS, ADD_GROUP, UPDATE_GROUP, REMOVE_GROUP, EXCHANGE_GROUPS } from './types';


export const initializeGroups = (groups: Group[]) => {
  const action = {
      type: SET_GROUPS,
      payload: groups,
  };

  return action;  
};

export const addGroup = (group: Group) => {
  const action = {
    type: ADD_GROUP,
    payload: group
  };

  return action;  
};

export const updateGroup = (group: Group) => {
  const action = {
    type: UPDATE_GROUP,
    payload: group
  };

  return action;  
};
  
export const removeGroup = (id: string) => {
  const action = {
    type: REMOVE_GROUP,
    payload: id
  };

    return action;  
  };

export const exchangeGroups = (groups: Group[]) => {
  const action = {
      type: EXCHANGE_GROUPS,
      payload: groups,
    };
        
    return action;  
};

