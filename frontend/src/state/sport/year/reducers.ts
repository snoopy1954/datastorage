import { Year } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_SPORTYEAR, CLEAR_SELECTED_SPORTYEAR, ActionTypes } from './types';

import { emptyYear } from '../../../utils/basic/year';

const initialState: Year = emptyYear();

export const sportyearReducer = (state = initialState, action: ActionTypes): Year => {
    switch (action.type) {
        case SET_SELECTED_SPORTYEAR:
            return (
                action.payload
            );
        case CLEAR_SELECTED_SPORTYEAR:
            return (
                initialState
            );
        default:
            return state
    }
};