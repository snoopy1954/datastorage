import { Moviegroup } from '../../../../../backend/src/types/movie';
import { SET_SELECTED_MOVIEGROUP, CLEAR_SELECTED_MOVIEGROUP, ActionTypes } from './types';

const initialState: Moviegroup = {
    id: '',
    groupname: {
        seqnr: 0,
        name: ''
    },
    subgroups: []
};

export const selectedmoviegroupReducer = (state = initialState, action: ActionTypes): Moviegroup => {
    switch (action.type) {
        case SET_SELECTED_MOVIEGROUP:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_MOVIEGROUP:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};