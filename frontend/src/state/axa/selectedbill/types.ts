import { Bill } from '../../../../../backend/src/types/axa';

export const SET_SELECTED_BILL = 'SET_SELECTED_BILL';
export const CLEAR_SELECTED_BILL = 'CLEAR_SELECTED_BILL';

interface SetSelectedBillAction {
    type: typeof SET_SELECTED_BILL;
    payload: Bill;
}

interface ClearSelectedBillAction {
    type: typeof CLEAR_SELECTED_BILL;
}

export type ActionTypes = SetSelectedBillAction | ClearSelectedBillAction;