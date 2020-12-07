import { SET_PDFURL, CLEAR_PDFURL, ActionTypes } from './types';

const initialState = '';

export const pdfurlReducer = (state = initialState, action: ActionTypes): string => {
    switch (action.type) {
        case SET_PDFURL:
            return (action.payload);
        case CLEAR_PDFURL:
            return ('');
        default:
            return state
    }
};