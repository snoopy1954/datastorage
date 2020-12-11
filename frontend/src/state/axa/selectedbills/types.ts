import { Bill } from '../../../../../backend/src/types/axa';

export const SET_SELECTED_BILLS = 'SET_SELECTED_BILLS';
export const CLEAR_SELECTED_BILLS = 'CLEAR_SELECTED_BILLS';

interface SetSelectedBillsAction {
    type: typeof SET_SELECTED_BILLS;
    payload: Bill[];
}

interface ClearSelectedBillsAction {
    type: typeof CLEAR_SELECTED_BILLS;
}

export type ActionTypes = SetSelectedBillsAction | ClearSelectedBillsAction;