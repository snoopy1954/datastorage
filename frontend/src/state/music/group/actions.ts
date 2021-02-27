import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_MUSICGROUP, CLEAR_SELECTED_MUSICGROUP, ActionTypes } from './types';

export const setSelectedGroup = (group: Group) => {
    const action: ActionTypes = {
        type: SET_SELECTED_MUSICGROUP,
        payload: group
    };
    
    return action;  
};

export const clearSelectedGroup = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_MUSICGROUP
    };
    
    return action;  
};
