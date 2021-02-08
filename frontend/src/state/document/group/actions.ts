import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_DOCUMENTGROUP, CLEAR_SELECTED_DOCUMENTGROUP, ActionTypes } from './types';

export const setSelectedGroup = (group: Group) => {
    const action: ActionTypes = {
        type: SET_SELECTED_DOCUMENTGROUP,
        payload: group
    };
    
    return action;  
};

export const clearSelectedGroup = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_DOCUMENTGROUP
    };
    
    return action;  
};
