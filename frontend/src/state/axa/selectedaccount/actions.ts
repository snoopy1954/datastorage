import { Account } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_ACCOUNT, CLEAR_SELECTED_ACCOUNT, ActionTypes } from './types';

export const setSelectedAccount = (account: Account) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ACCOUNT,
        payload: account
    };
    
    return action;  
}

export const clearSelectedAccount = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ACCOUNT
    };
    
    return action;  
}

