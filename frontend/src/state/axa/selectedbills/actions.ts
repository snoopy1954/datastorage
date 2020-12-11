import { Bill } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILLS, CLEAR_SELECTED_BILLS, ActionTypes } from './types';

export const setSelectedBills = (bills: Bill[]) => {
    const action: ActionTypes = {
        type: SET_SELECTED_BILLS,
        payload: bills
    };
    
    return action;  
}

export const clearSelectedBills = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_BILLS
    };
    
    return action;  
}

