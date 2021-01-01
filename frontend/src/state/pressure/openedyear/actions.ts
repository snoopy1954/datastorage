import { Year } from '../../../../../backend/src/types/pressure';
import { SET_OPENED_YEAR, CLEAR_OPENED_YEAR, ActionTypes } from './types';

export const setOpenedYear = (year: Year) => {
    const action: ActionTypes = {
        type: SET_OPENED_YEAR,
        payload: year
    };
    
    return action;  
}

export const clearOpenedYear = () => {
    const action: ActionTypes = {
        type: CLEAR_OPENED_YEAR
    };
    
    return action;  
}

