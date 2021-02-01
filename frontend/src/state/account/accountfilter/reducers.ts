import { Accountfilter } from '../../../types/account';
import { newAccountfilter } from '../../../utils/account/accountfilter';

import { SET_ACCOUNTFILTER, CLEAR_ACCOUNTFILTER, ActionTypes } from './types';

const initialState: Accountfilter = newAccountfilter();

export const accountfilterReducer = (state = initialState, action: ActionTypes): Accountfilter => {
    switch (action.type) {
        case SET_ACCOUNTFILTER: 
            return {
                ...action.payload
            }
        case CLEAR_ACCOUNTFILTER:
            return {
                ...initialState
            }
        default: {
            return state
        }
    }
}