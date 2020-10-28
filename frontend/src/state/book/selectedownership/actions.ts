import { Ownership } from '../../../../../backend/src/types/book';
import { SET_SELECTED_OWNERSHIP, CLEAR_SELECTED_OWNERSHIP, ActionTypes } from './types';

export const setSelectedOwnership = (ownership: Ownership) => {
    const action: ActionTypes = {
        type: SET_SELECTED_OWNERSHIP,
        payload: ownership
    };
    
    return action;  
}

export const clearSelectedOwnership = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_OWNERSHIP
    };
    
    return action;  
}

