import { Format } from '../../../../../backend/src/types/basic';
import { SET_SELECTED_MOVIEFORMAT, CLEAR_SELECTED_MOVIEFORMAT, ActionTypes } from './types';

const initialState: Format = {
    id: '',
    seqnr: 0,
    name: ''
};

export const selectedmovieformatReducer = (state = initialState, action: ActionTypes): Format => {
    switch (action.type) {
        case SET_SELECTED_MOVIEFORMAT:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_MOVIEFORMAT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};