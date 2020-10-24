import { Address } from '../../../../../backend/src/types/addressTypes';
import { SET_SELECTED_ADDRESS, CLEAR_SELECTED_ADDRESS, ActionTypes } from './types';
import { newAddress } from '../../../utils/address';

const address = newAddress();
const initialState: Address = {
    id: '',
    ...address
};

export const selectedaddressReducer = (state = initialState, action: ActionTypes): Address => {
    switch (action.type) {
        case SET_SELECTED_ADDRESS:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_ADDRESS:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};