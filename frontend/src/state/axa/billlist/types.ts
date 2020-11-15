import { Bill } from '../../../../../backend/src/types/axa';

export const SET_BILL_LIST = 'SET_BILL_LIST';
export const ADD_BILL  = 'ADD_BILL';
export const UPDATE_BILL = 'UPDATE_BILL';
export const REMOVE_BILL = 'REMOVE_BILL';

interface SetBillListAction {
    type: typeof SET_BILL_LIST;
    payload: Bill[];
}

interface AddBillAction {
    type: typeof ADD_BILL;
    payload: Bill;
}

interface UpdateBillAction {
    type: typeof UPDATE_BILL;
    payload: Bill;
}

interface RemoveBillAction {
    type: typeof REMOVE_BILL;
    payload: string;
}

export type DispatchSetBillList = (arg: SetBillListAction) => (SetBillListAction);
export type DispatchAddBill = (arg: AddBillAction) => (AddBillAction);
export type DispatchUpdateBill = (arg: UpdateBillAction) => (UpdateBillAction);
export type DispatchRemoveBill = (arg: RemoveBillAction) => (RemoveBillAction);
    
export type BillActionTypes = SetBillListAction | AddBillAction | UpdateBillAction | RemoveBillAction;
    