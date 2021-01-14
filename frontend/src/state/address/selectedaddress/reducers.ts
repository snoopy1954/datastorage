import { Address } from '../../../../../backend/src/types/address';
import { SET_SELECTED_ADDRESS, CLEAR_SELECTED_ADDRESS, ActionTypes } from './types';

import { emptyAddress } from '../../../utils/address/address';


const initialState: Address = emptyAddress();

export const selectedaddressReducer = (state = initialState, action: ActionTypes): Address => {
    switch (action.type) {
        case SET_SELECTED_ADDRESS:
            return (
                action.payload
            );
        case CLEAR_SELECTED_ADDRESS:
            return (
                initialState
            );
        default:
            return state
    }
};