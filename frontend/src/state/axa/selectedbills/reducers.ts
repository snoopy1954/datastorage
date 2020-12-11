import { Bill } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILLS, CLEAR_SELECTED_BILLS, ActionTypes } from './types';

const initialState: Bill[] = [];

export const selectedbillsReducer = (state = initialState, action: ActionTypes): Bill[] => {
    switch (action.type) {
        case SET_SELECTED_BILLS: 
            return (
                action.payload
            );
        case CLEAR_SELECTED_BILLS:
            return (
                initialState
            );
        default:
            return state
    }
};