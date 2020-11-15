import { InvoicingParty } from '../../../../../backend/src/types/axa';

export const SET_SELECTED_INVOICINGPARTY = 'SET_SELECTED_INVOICINGPARTY';
export const CLEAR_SELECTED_INVOICINGPARTY = 'CLEAR_SELECTED_INVOICINGPARTY';

interface SetSelectedInvoicingpartyAction {
    type: typeof SET_SELECTED_INVOICINGPARTY;
    payload: InvoicingParty;
}

interface ClearSelectedInvoicingpartyAction {
    type: typeof CLEAR_SELECTED_INVOICINGPARTY;
}

export type ActionTypes = SetSelectedInvoicingpartyAction | ClearSelectedInvoicingpartyAction;