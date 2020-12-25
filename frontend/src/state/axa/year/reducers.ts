import { Year } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_AXAYEAR, CLEAR_SELECTED_AXAYEAR, ActionTypes } from './types';

import { emptyYear } from '../../../utils/axa';

const initialState: Year = emptyYear();

export const axayearReducer = (state = initialState, action: ActionTypes): Year => {
    switch (action.type) {
        case SET_SELECTED_AXAYEAR:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_AXAYEAR:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};