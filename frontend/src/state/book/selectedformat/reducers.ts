import { Format } from '../../../../../backend/src/types/book';
import { SET_SELECTED_FORMAT, CLEAR_SELECTED_FORMAT, ActionTypes } from './types';

const initialState: Format = {
    id: '',
    formatname: {
        seqnr: 0,
        name: ''
    }
};

export const selectedformatReducer = (state = initialState, action: ActionTypes): Format => {
    switch (action.type) {
        case SET_SELECTED_FORMAT:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_FORMAT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};