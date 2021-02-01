import { Accounttype } from '../../../../../backend/src/types/account';
import { SET_SELECTED_ACCOUNTTYPE, CLEAR_SELECTED_ACCOUNTTYPE, ActionTypes } from './types';

import { emptyAccounttype } from '../../../utils/account/accounttype';


const initialState: Accounttype = emptyAccounttype();

export const accounttypeReducer = (state = initialState, action: ActionTypes): Accounttype => {
    switch (action.type) {
        case SET_SELECTED_ACCOUNTTYPE:
            return (
                action.payload
            );
        case CLEAR_SELECTED_ACCOUNTTYPE:
            return (
                initialState
            );
        default:
            return state
    }
};