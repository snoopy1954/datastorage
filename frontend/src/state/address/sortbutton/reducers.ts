import { SET_SORTBUTTON, CLEAR_SORTBUTTON, ActionTypes } from './types';

const initialState = false;

export const sortbuttonReducer = (state = initialState, action: ActionTypes): boolean => {
    switch (action.type) {
        case SET_SORTBUTTON:
            return (
                true
            );
        case CLEAR_SORTBUTTON:
            return (
                false
            );
        default:
            return state
    }
};