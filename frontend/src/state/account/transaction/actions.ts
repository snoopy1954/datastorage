import { Transaction } from '../../../../../backend/src/types/account';
import { SET_SELECTED_TRANSACTION, CLEAR_SELECTED_TRANSACTION, ActionTypes } from './types';

export const setSelectedTransaction = (transaction: Transaction) => {
    const action: ActionTypes = {
        type: SET_SELECTED_TRANSACTION,
        payload: transaction
    };
    
    return action;  
}

export const clearSelectedTransaction = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_TRANSACTION
    };
    
    return action;  
}

