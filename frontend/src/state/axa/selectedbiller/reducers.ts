import { Biller } from '../../../../../backend/src/types/axa';
import { SET_SELECTED_BILLER, CLEAR_SELECTED_BILLER, ActionTypes } from './types';

const initialState: Biller = {
    id: '',
    name: { name: '', seqnr: 0 },
    person: ''
};

export const selectedbillerReducer = (state = initialState, action: ActionTypes): Biller => {
    switch (action.type) {
        case SET_SELECTED_BILLER:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_BILLER:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};