import { Bookgroup } from '../../../../../backend/src/types/book';
import { SET_SELECTED_BOOKGROUP, CLEAR_SELECTED_BOOKGROUP, ActionTypes } from './types';

import { emptyBookgroup } from '../../../utils/book/bookgroup';


const initialState: Bookgroup = emptyBookgroup();

export const selectedbookgroupReducer = (state = initialState, action: ActionTypes): Bookgroup => {
    switch (action.type) {
        case SET_SELECTED_BOOKGROUP:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_BOOKGROUP:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};