import { Biller } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILLER, CLEAR_SELECTED_BILLER, ActionTypes } from './types';

import { emptyBiller } from '../../../utils/axa/biller';

const initialState: Biller = emptyBiller();

export const selectedbillerReducer = (state = initialState, action: ActionTypes): Biller => {
    switch (action.type) {
        case SET_SELECTED_BILLER:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_BILLER:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};