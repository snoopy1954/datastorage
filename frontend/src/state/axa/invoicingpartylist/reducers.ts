import { InvoicingParty } from '../../../../../backend/src/types/axa';
import { SET_INVOICINGPARTY_LIST, ADD_INVOICINGPARTY, UPDATE_INVOICINGPARTY, REMOVE_INVOICINGPARTY, InvoicingpartyActionTypes } from './types';

const initialState: InvoicingParty[] = [];

export const invoicingpartylistReducer = (state = initialState, action: InvoicingpartyActionTypes): InvoicingParty[] => {
    switch (action.type) {
        case SET_INVOICINGPARTY_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, invoicingparty) => ({ ...memo, [invoicingparty.id]: invoicingparty }),
                    {}
                ),
            }
        case ADD_INVOICINGPARTY:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_INVOICINGPARTY:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_INVOICINGPARTY: 
            return {
                ...(Object.values(state)).filter((invoicingparty) => (invoicingparty.id !== action.payload))
            }
        default:
            return state
    }
}

