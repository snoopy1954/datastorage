import { InvoicingParty, InvoicingPartyNoID } from '../../../../../backend/src/types/axa';
import { 
    SET_INVOICINGPARTY_LIST, 
    ADD_INVOICINGPARTY,
    UPDATE_INVOICINGPARTY,
    REMOVE_INVOICINGPARTY,
    DispatchSetInvoicingpartyList,
    DispatchAddInvoicingparty,
    DispatchUpdateInvoicingparty,
    DispatchRemoveInvoicingparty
} from './types';

import { create, update, remove, getAll } from "../../../services/axa/invoicingparties";


export const initializeInvoicingparties = () => {
  return async (dispatch: DispatchSetInvoicingpartyList) => {
    const invoicingparties = await getAll();
    dispatch({
      type: SET_INVOICINGPARTY_LIST,
      payload: invoicingparties,
    });
  }
}

export const addInvoicingparty = (invoicingparty: InvoicingPartyNoID) => {
  return async (dispatch: DispatchAddInvoicingparty) => {
    const newInvoicingparty = await create(invoicingparty);
    dispatch({
      type: ADD_INVOICINGPARTY,
      payload: newInvoicingparty
    });
  }
};

export const updateInvoicingparty = (invoicingparty: InvoicingParty) => {
  return async (dispatch: DispatchUpdateInvoicingparty) => {
    const newInvoicingparty = await update(invoicingparty.id, invoicingparty);
    dispatch({
      type: UPDATE_INVOICINGPARTY,
      payload: newInvoicingparty
    });
  }
};
  
export const removeInvoicingparty = (id: string) => {
  return async (dispatch: DispatchRemoveInvoicingparty) => {
    await remove(id);
    dispatch({
      type: REMOVE_INVOICINGPARTY,
      payload: id
    });
  }
};
