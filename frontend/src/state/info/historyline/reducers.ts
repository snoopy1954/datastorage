import { Historyline } from '../../../../../backend/src/types/logging';
import { SET_SELECTED_HISTORYLINE, CLEAR_SELECTED_HISTORYLINE, ActionTypes } from './types';
import { emptyHistoryline } from '../../../utils/info/historyline';

const initialState = emptyHistoryline();

export const historylineReducer = (state = initialState, action: ActionTypes): Historyline => {
    switch (action.type) {
        case SET_SELECTED_HISTORYLINE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_HISTORYLINE:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};