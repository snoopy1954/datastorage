import { Bill } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILL, CLEAR_SELECTED_BILL, ActionTypes } from './types';

export const setSelectedBill = (bill: Bill) => {
    const action: ActionTypes = {
        type: SET_SELECTED_BILL,
        payload: bill
    };
    
    return action;  
}

export const clearSelectedBill = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_BILL
    };
    
    return action;  
}

