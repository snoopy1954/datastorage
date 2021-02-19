import { Year } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_SPORTYEAR, CLEAR_SELECTED_SPORTYEAR, ActionTypes } from './types';

export const setSelectedYear = (year: Year) => {
    const action: ActionTypes = {
        type: SET_SELECTED_SPORTYEAR,
        payload: year
    };
    
    return action;  
}

export const clearSelectedYear = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_SPORTYEAR
    };
    
    return action;  
}

