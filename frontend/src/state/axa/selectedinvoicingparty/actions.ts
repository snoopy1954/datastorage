import { InvoicingParty } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_INVOICINGPARTY, CLEAR_SELECTED_INVOICINGPARTY, ActionTypes } from './types';

export const setSelectedInvoicingparty = (invoicingparty: InvoicingParty) => {
    const action: ActionTypes = {
        type: SET_SELECTED_INVOICINGPARTY,
        payload: invoicingparty
    };
    
    return action;  
}

export const clearSelectedInvoicingparty = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_INVOICINGPARTY
    };
    
    return action;  
}

