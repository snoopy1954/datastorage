import { InvoicingParty } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_INVOICINGPARTY, CLEAR_SELECTED_INVOICINGPARTY, ActionTypes } from './types';

const initialState: InvoicingParty = {
    id: '',
    name: '',
    person: ''
};

export const selectedinvoicingpartyReducer = (state = initialState, action: ActionTypes): InvoicingParty => {
    switch (action.type) {
        case SET_SELECTED_INVOICINGPARTY:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_INVOICINGPARTY:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};