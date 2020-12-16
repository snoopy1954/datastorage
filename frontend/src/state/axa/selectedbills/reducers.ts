import { Bill } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILLS, CLEAR_SELECTED_BILLS, ADD_SELECTED_BILL, ActionTypes } from './types';

const initialState: Bill[] = [];

export const selectedbillsReducer = (state = initialState, action: ActionTypes): Bill[] => {
    switch (action.type) {
        case SET_SELECTED_BILLS: {
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, bill) => ({ ...memo, [bill.id]: bill }),
                    {}
                ),
            }
        }
        case CLEAR_SELECTED_BILLS:
            return (
                initialState
            );
        case ADD_SELECTED_BILL:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        default:
            return state
    }
};