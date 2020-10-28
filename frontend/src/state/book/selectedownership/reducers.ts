import { Ownership } from '../../../../../backend/src/types/book';
import { SET_SELECTED_OWNERSHIP, CLEAR_SELECTED_OWNERSHIP, ActionTypes } from './types';

const initialState: Ownership = {
    id: '',
    ownershipname: {
        seqnr: 0,
        name: ''
    }
};

export const selectedownershipReducer = (state = initialState, action: ActionTypes): Ownership => {
    switch (action.type) {
        case SET_SELECTED_OWNERSHIP:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_OWNERSHIP:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};