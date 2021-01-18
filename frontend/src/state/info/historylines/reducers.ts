import { Historyline } from '../../../../../backend/src/types/logging';
import { SET_HISTORYLINES, ADD_HISTORYLINE, ActionTypes } from './types';

const initialState: Historyline[] = [];

export const historylinesReducer = (state = initialState, action: ActionTypes): Historyline[] => {
    switch (action.type) {
        case SET_HISTORYLINES:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, historyline) => ({ ...memo, [historyline.id]: historyline }),
                    {}
                ),
            }
        case ADD_HISTORYLINE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        default:
            return state
    }
}

