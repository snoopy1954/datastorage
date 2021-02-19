import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_SPORTGROUP, CLEAR_SELECTED_SPORTGROUP, ActionTypes } from './types';

export const setSelectedGroup = (group: Group) => {
    const action: ActionTypes = {
        type: SET_SELECTED_SPORTGROUP,
        payload: group
    };
    
    return action;  
};

export const clearSelectedGroup = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_SPORTGROUP
    };
    
    return action;  
};
