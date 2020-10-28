import { Tongue } from '../../../../../backend/src/types/book';
import { SET_SELECTED_TONGUE, CLEAR_SELECTED_TONGUE, ActionTypes } from './types';

const initialState: Tongue = {
    id: '',
    tonguename: {
        seqnr: 0,
        name: ''
    }
};

export const selectedtongueReducer = (state = initialState, action: ActionTypes): Tongue => {
    switch (action.type) {
        case SET_SELECTED_TONGUE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_TONGUE:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};