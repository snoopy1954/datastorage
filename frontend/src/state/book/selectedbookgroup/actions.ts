import { Bookgroup } from '../../../../../backend/src/types/book';
import { SET_SELECTED_BOOKGROUP, CLEAR_SELECTED_BOOKGROUP, ActionTypes } from './types';

export const setSelectedBookgroup = (bookgroup: Bookgroup) => {
    const action: ActionTypes = {
        type: SET_SELECTED_BOOKGROUP,
        payload: bookgroup
    };
    
    return action;  
}

export const clearSelectedBookgroup = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_BOOKGROUP
    };
    
    return action;  
}

