import { Bill } from '../../../../../backend/src/types/axa';

export const SET_BILLS = 'SET_BILLS';
export const ADD_BILL  = 'ADD_BILL';
export const UPDATE_BILL = 'UPDATE_BILL';
export const REMOVE_BILL = 'REMOVE_BILL';

interface SetBillsAction {
    type: typeof SET_BILLS;
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

export type DispatchSetBills = (arg: SetBillsAction) => (SetBillsAction);
export type DispatchAddBill = (arg: AddBillAction) => (AddBillAction);
export type DispatchUpdateBill = (arg: UpdateBillAction) => (UpdateBillAction);
export type DispatchRemoveBill = (arg: RemoveBillAction) => (RemoveBillAction);
    
export type ActionTypes = SetBillsAction | AddBillAction | UpdateBillAction | RemoveBillAction;
    