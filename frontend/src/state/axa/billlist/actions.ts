import { Bill, BillNoID } from '../../../../../backend/src/types/axa';
import { 
    SET_BILL_LIST, 
    ADD_BILL,
    UPDATE_BILL,
    REMOVE_BILL,
    DispatchSetBillList,
    DispatchAddBill,
    DispatchUpdateBill,
    DispatchRemoveBill
} from './types';

import { create, update, remove, getAll } from "../../../services/axa/bills";


export const initializeBills = () => {
  return async (dispatch: DispatchSetBillList) => {
    const bills = await getAll();
    dispatch({
      type: SET_BILL_LIST,
      payload: bills,
    });
  }
}

export const addBill = (bill: BillNoID) => {
  return async (dispatch: DispatchAddBill) => {
    const newBill = await create(bill);
    dispatch({
      type: ADD_BILL,
      payload: newBill
    });
  }
};

export const updateBill = (bill: Bill) => {
  return async (dispatch: DispatchUpdateBill) => {
    const newBill = await update(bill.id, bill);
    dispatch({
      type: UPDATE_BILL,
      payload: newBill
    });
  }
};
  
export const removeBill = (id: string) => {
  return async (dispatch: DispatchRemoveBill) => {
    await remove(id);
    dispatch({
      type: REMOVE_BILL,
      payload: id
    });
  }
};
