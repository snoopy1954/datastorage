import { Year } from '../../../../../backend/src/types/basic';
import { SET_SPORTYEARS, ADD_SPORTYEAR, UPDATE_SPORTYEAR, REMOVE_SPORTYEAR, ActionTypes } from './types';

const initialState: Year[] = [];

export const sportyearsReducer = (state = initialState, action: ActionTypes): Year[] => {
    switch (action.type) {
        case SET_SPORTYEARS:
            return {
                ...state,
                ...action.payload.reduce((memo, year) => ({ ...memo, [year.id]: year }), {}),
            }
        case ADD_SPORTYEAR:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_SPORTYEAR:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_SPORTYEAR: 
            return {
                ...state.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}

