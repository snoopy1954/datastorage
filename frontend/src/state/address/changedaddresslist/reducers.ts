import { Address } from '../../../../../backend/src/types/address';
import { ADD_CHANGED_ADDRESS, CLEAR_CHANGED_ADDRESS, ActionTypes } from './types';

const initialState: Address[] = [];

export const changedaddresslistReducer = (state = initialState, action: ActionTypes): Address[] => {
    switch (action.type) {
        case ADD_CHANGED_ADDRESS:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case CLEAR_CHANGED_ADDRESS:
            return {
                ...initialState
            }
        default:
            return state
    }
}

