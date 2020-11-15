import { Bill, BillNoID } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILL, CLEAR_SELECTED_BILL, ActionTypes } from './types';
import { newBill } from '../../../utils/axa';

const bill: BillNoID = newBill();
const initialState: Bill = {
    id: '',
    ...bill
};

export const selectedbillReducer = (state = initialState, action: ActionTypes): Bill => {
    switch (action.type) {
        case SET_SELECTED_BILL:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_BILL:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};