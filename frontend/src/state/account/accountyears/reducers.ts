import { Accountyear } from '../../../../../backend/src/types/account';
import { SET_ACCOUNTYEARS, ADD_ACCOUNTYEAR, UPDATE_ACCOUNTYEAR, REMOVE_ACCOUNTYEAR, ActionTypes } from './types';

const initialState: Accountyear[] = [];

export const accountyearsReducer = (state = initialState, action: ActionTypes): Accountyear[] => {
    switch (action.type) {
        case SET_ACCOUNTYEARS:
            return {
                ...state,
                ...action.payload.reduce((memo, year) => ({ ...memo, [year.id]: year }), {}),
            }
        case ADD_ACCOUNTYEAR:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_ACCOUNTYEAR:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_ACCOUNTYEAR: 
            return {
                ...state.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}

