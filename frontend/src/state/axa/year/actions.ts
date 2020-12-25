import { Year } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_AXAYEAR, CLEAR_SELECTED_AXAYEAR, ActionTypes } from './types';

export const setSelectedYear = (year: Year) => {
    const action: ActionTypes = {
        type: SET_SELECTED_AXAYEAR,
        payload: year
    };
    
    return action;  
}

export const clearSelectedYear = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_AXAYEAR
    };
    
    return action;  
}

