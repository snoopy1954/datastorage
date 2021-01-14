import { Addressgroup } from '../../../../../backend/src/types/address';
import { SET_SELECTED_ADDRESSGROUP, CLEAR_SELECTED_ADDRESSGROUP, ActionTypes } from './types';

import { emptyAddressgroup } from '../../../utils/address/addressgroup';

const initialState: Addressgroup = emptyAddressgroup();

export const selectedaddressgroupReducer = (state = initialState, action: ActionTypes): Addressgroup => {
    switch (action.type) {
        case SET_SELECTED_ADDRESSGROUP: 
            return (
                action.payload
            );
        case CLEAR_SELECTED_ADDRESSGROUP:
            return (
                initialState
            );
        default:
            return state
    }
};