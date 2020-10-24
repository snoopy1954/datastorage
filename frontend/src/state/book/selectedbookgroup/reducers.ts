import { Bookgroup } from '../../../types/book';
import { SET_SELECTED_BOOKGROUP, CLEAR_SELECTED_BOOKGROUP, ActionTypes } from './types';

const initialState: Bookgroup = {
    id: '',
    groupname: {
        seqnr: 0,
        name: ''
    },
    subgroups: []
};

export const selectedbookgroupReducer = (state = initialState, action: ActionTypes): Bookgroup => {
    switch (action.type) {
        case SET_SELECTED_BOOKGROUP:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_BOOKGROUP:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};