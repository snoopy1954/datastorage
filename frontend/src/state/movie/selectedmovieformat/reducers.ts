import { Movieformat } from '../../../../../backend/src/types/movie';
import { SET_SELECTED_MOVIEFORMAT, CLEAR_SELECTED_MOVIEFORMAT, ActionTypes } from './types';

const initialState: Movieformat = {
    id: '',
//    formatname: {
        seqnr: 0,
        name: ''
//    }
};

export const selectedmovieformatReducer = (state = initialState, action: ActionTypes): Movieformat => {
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