import { Year } from '../../../../../backend/src/types/axa';
import { SET_AXAYEAR_LIST, ADD_AXAYEAR, UPDATE_AXAYEAR, REMOVE_AXAYEAR, YearActionTypes } from './types';

const initialState: Year[] = [];

export const axayearsReducer = (state = initialState, action: YearActionTypes): Year[] => {
    switch (action.type) {
        case SET_AXAYEAR_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, year) => ({ ...memo, [year.id]: year }),
                    {}
                ),
            }
        case ADD_AXAYEAR:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_AXAYEAR:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_AXAYEAR: 
            return {
                ...state.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}

