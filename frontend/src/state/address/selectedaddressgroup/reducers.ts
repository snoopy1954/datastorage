import { Addressgroup } from '../../../../../backend/src/types/address';
import { SET_SELECTED_ADDRESSGROUP, CLEAR_SELECTED_ADDRESSGROUP, ActionTypes } from './types';

const initialState: Addressgroup = {
    id: '',
    groupname: { name: '', seqnr: 0 }
};

export const selectedaddressgroupReducer = (state = initialState, action: ActionTypes): Addressgroup => {
    switch (action.type) {
        case SET_SELECTED_ADDRESSGROUP:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_ADDRESSGROUP:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};