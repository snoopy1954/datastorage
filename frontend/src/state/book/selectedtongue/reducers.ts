import { Tongue } from '../../../../../backend/src/types/book';
import { SET_SELECTED_TONGUE, CLEAR_SELECTED_TONGUE, ActionTypes } from './types';

import { emptyTongue } from '../../../utils/book/tongue';


const initialState: Tongue = emptyTongue();

export const selectedtongueReducer = (state = initialState, action: ActionTypes): Tongue => {
    switch (action.type) {
        case SET_SELECTED_TONGUE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_TONGUE:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};