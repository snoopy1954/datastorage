import { Account } from '../../../../../backend/src/types/axa';
import { SET_OPEN_ACCOUNT, CLEAR_OPEN_ACCOUNT, ActionTypes } from './types';

export const setOpenAccount = (account: Account) => {
    const action: ActionTypes = {
        type: SET_OPEN_ACCOUNT,
        payload: account
    };
    
    return action;  
}

export const clearOpenAccount = () => {
    const action: ActionTypes = {
        type: CLEAR_OPEN_ACCOUNT
    };
    
    return action;  
}

