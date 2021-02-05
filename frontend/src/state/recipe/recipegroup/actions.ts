import { Group } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_RECIPEGROUP, CLEAR_SELECTED_RECIPEGROUP, ActionTypes } from './types';

export const setSelectedGroup = (group: Group) => {
    const action: ActionTypes = {
        type: SET_SELECTED_RECIPEGROUP,
        payload: group
    };
    
    return action;  
};

export const clearSelectedGroup = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_RECIPEGROUP
    };
    
    return action;  
};
