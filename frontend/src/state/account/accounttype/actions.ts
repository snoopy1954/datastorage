import { Accounttype } from '../../../../../backend/src/types/account';
import { SET_SELECTED_ACCOUNTTYPE, CLEAR_SELECTED_ACCOUNTTYPE, ActionTypes } from './types';

export const setSelectedAccounttype = (moviegroup: Accounttype) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ACCOUNTTYPE,
        payload: moviegroup
    };
    
    return action;  
}

export const clearSelectedAccounttype = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ACCOUNTTYPE
    };
    
    return action;  
}

