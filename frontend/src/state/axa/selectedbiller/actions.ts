import { Biller } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILLER, CLEAR_SELECTED_BILLER, ActionTypes } from './types';

export const setSelectedBiller = (invoicingparty: Biller) => {
    const action: ActionTypes = {
        type: SET_SELECTED_BILLER,
        payload: invoicingparty
    };
    
    return action;  
}

export const clearSelectedBiller = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_BILLER
    };
    
    return action;  
}

