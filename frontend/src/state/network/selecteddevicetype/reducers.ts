import { Devicetype } from '../../../../../backend/src/types/network';
import { SET_SELECTED_DEVICETYPE, CLEAR_SELECTED_DEVICETYPE, ActionTypes } from './types';

const initialState: Devicetype = {
    id: '',
    name: ''
};

export const selecteddevicetypeReducer = (state = initialState, action: ActionTypes): Devicetype => {
    switch (action.type) {
        case SET_SELECTED_DEVICETYPE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_DEVICETYPE:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};