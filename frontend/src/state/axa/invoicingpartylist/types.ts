import { InvoicingParty } from '../../../../../backend/src/types/axa';

export const SET_INVOICINGPARTY_LIST = 'SET_INVOICINGPARTY_LIST';
export const ADD_INVOICINGPARTY  = 'ADD_INVOICINGPARTY';
export const UPDATE_INVOICINGPARTY = 'UPDATE_INVOICINGPARTY';
export const REMOVE_INVOICINGPARTY = 'REMOVE_INVOICINGPARTY';

interface SetInvoicingpartyListAction {
    type: typeof SET_INVOICINGPARTY_LIST;
    payload: InvoicingParty[];
}

interface AddInvoicingpartyAction {
    type: typeof ADD_INVOICINGPARTY;
    payload: InvoicingParty;
}

interface UpdateInvoicingpartyAction {
    type: typeof UPDATE_INVOICINGPARTY;
    payload: InvoicingParty;
}

interface RemoveInvoicingpartyAction {
    type: typeof REMOVE_INVOICINGPARTY;
    payload: string;
}

export type DispatchSetInvoicingpartyList = (arg: SetInvoicingpartyListAction) => (SetInvoicingpartyListAction);
export type DispatchAddInvoicingparty = (arg: AddInvoicingpartyAction) => (AddInvoicingpartyAction);
export type DispatchUpdateInvoicingparty = (arg: UpdateInvoicingpartyAction) => (UpdateInvoicingpartyAction);
export type DispatchRemoveInvoicingparty = (arg: RemoveInvoicingpartyAction) => (RemoveInvoicingpartyAction);
    
export type InvoicingpartyActionTypes = SetInvoicingpartyListAction | AddInvoicingpartyAction | UpdateInvoicingpartyAction | RemoveInvoicingpartyAction;
    