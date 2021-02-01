import { Accountyear } from '../../../../../backend/src/types/account';
import { SET_SELECTED_ACCOUNTYEAR, CLEAR_SELECTED_ACCOUNTYEAR, ActionTypes } from './types';

export const setSelectedAccountyear = (year: Accountyear) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ACCOUNTYEAR,
        payload: year
    };
    
    return action;  
}

export const clearSelectedAccountyear = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ACCOUNTYEAR
    };
    
    return action;  
}

