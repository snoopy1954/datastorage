import { SET_NOTIFICATION, CLEAR_NOTIFICATION, ActionTypes } from './types';

const initialState = '';

export const notificationReducer = (state = initialState, action: ActionTypes): string => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return action.payload;
        case CLEAR_NOTIFICATION:
            return '';
        default:
            return state
    }
};