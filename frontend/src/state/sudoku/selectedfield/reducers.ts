import { SET_SELECTED_FIELD, CLEAR_SELECTED_FIELD, ActionTypes } from './types';

const initialState = 0;

export const selectedfieldReducer = (state = initialState, action: ActionTypes): number => {
    switch (action.type) {
        case SET_SELECTED_FIELD:
            return action.payload;
        case CLEAR_SELECTED_FIELD:
            return initialState;
        default:
            return state
    }
};