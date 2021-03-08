import { Historyline } from '../../../../../backend/src/types/logging';
import { SET_HISTORYLINES, ADD_HISTORYLINE, UPDATE_HISTORYLINE, REMOVE_HISTORYLINE, ActionTypes } from './types';

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
        case UPDATE_HISTORYLINE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_HISTORYLINE: 
            return {
                ...(Object.values(state)).filter((historyline) => (historyline.id !== action.payload))
            }
        default:
            return state
    }
}

