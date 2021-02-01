import { Accountyear } from '../../../../../backend/src/types/account';
import { SET_SELECTED_ACCOUNTYEAR, CLEAR_SELECTED_ACCOUNTYEAR, ActionTypes } from './types';

import { emptyAccountyear } from '../../../utils/account/accountyear';

const initialState: Accountyear = emptyAccountyear();

export const accountyearReducer = (state = initialState, action: ActionTypes): Accountyear => {
    switch (action.type) {
        case SET_SELECTED_ACCOUNTYEAR:
            return (
                action.payload
            );
        case CLEAR_SELECTED_ACCOUNTYEAR:
            return (
                initialState
            );
        default:
            return state
    }
};