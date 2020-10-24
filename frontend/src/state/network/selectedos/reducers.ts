import { Os } from '../../../types/network';
import { SET_SELECTED_OS, CLEAR_SELECTED_OS, ActionTypes } from './types';

const initialState: Os = {
    id: '',
    name: '',
    versions: []
};

export const selectedosReducer = (state = initialState, action: ActionTypes): Os => {
    switch (action.type) {
        case SET_SELECTED_OS:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_OS:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};