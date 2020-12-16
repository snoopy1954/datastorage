import { Bill } from '../../../../../backend/src/types/axa';
import { SET_BILL_LIST, ADD_BILL, UPDATE_BILL, REMOVE_BILL, BillActionTypes } from './types';

const initialState: Bill[] = [];

export const billlistReducer = (state = initialState, action: BillActionTypes): Bill[] => {
    switch (action.type) {
        case SET_BILL_LIST: {
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, bill) => ({ ...memo, [bill.id]: bill }),
                    {}
                ),
            }
        }
        case ADD_BILL:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_BILL:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_BILL: 
            return {
                ...(Object.values(state)).filter((bill) => (bill.id !== action.payload))
            }
        default:
            return state
    }
}

