import { Biller } from '../../../../../backend/src/types/axa';
import { ADD_CHANGED_BILLER, CLEAR_CHANGED_BILLER, ActionTypes } from './types';

const initialState: Biller[] = [];

export const changedbillerlistReducer = (state = initialState, action: ActionTypes): Biller[] => {
    switch (action.type) {
        case ADD_CHANGED_BILLER:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case CLEAR_CHANGED_BILLER:
            return {
                ...initialState
            }
        default:
            return state
    }
}

