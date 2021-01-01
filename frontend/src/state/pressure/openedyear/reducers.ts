import { Year } from '../../../../../backend/src/types/pressure';
import { SET_OPENED_YEAR, CLEAR_OPENED_YEAR, ActionTypes } from './types';

const initialState: Year = {
    id: '',
    name: {
        name: '',
        seqnr: 0
    },
    isLastYear: false,
    lastMonth: 0
};

export const openedyearReducer = (state = initialState, action: ActionTypes): Year => {
    switch (action.type) {
        case SET_OPENED_YEAR:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_OPENED_YEAR:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};