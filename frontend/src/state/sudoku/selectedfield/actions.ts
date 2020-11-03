import { SET_SELECTED_FIELD, CLEAR_SELECTED_FIELD, ActionTypes } from './types';

export const setSelectedField = (field: number) => {
    const action: ActionTypes = {
        type: SET_SELECTED_FIELD,
        payload: field
    };
    
    return action;  
}

export const clearSelectedField = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_FIELD
    };
    
    return action;  
}

