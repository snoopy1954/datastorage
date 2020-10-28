import { SET_SORTBUTTON, CLEAR_SORTBUTTON, ActionTypes } from './types';

export const setSortButton = () => {
    const action: ActionTypes = {
        type: SET_SORTBUTTON
    };
    
    return action;  
}

export const clearSortButton = () => {
    const action: ActionTypes = {
        type: CLEAR_SORTBUTTON
    };
    
    return action;  
}

