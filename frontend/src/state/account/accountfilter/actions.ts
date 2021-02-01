import { Accountfilter } from '../../../types/account';

import { SET_ACCOUNTFILTER, CLEAR_ACCOUNTFILTER, ActionTypes } from './types';

export const setAccountfilter = (accountfilter: Accountfilter) => {
    const action: ActionTypes = {
        type: SET_ACCOUNTFILTER,
        payload: accountfilter
    };
    
    return action;  
}

export const clearAccountfilter = () => {
    const action: ActionTypes = {
        type: CLEAR_ACCOUNTFILTER
    };
    
    return action;  
}
