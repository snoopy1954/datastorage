import { Year } from '../../../../../backend/src/types/basic';

import { SET_YEARS, ADD_YEAR, UPDATE_YEAR, REMOVE_YEAR, ActionTypes } from './types';

const initialState: Year[] = [];

export const yearsReducer = (state = initialState, action: ActionTypes): Year[] => {
    switch (action.type) {
        case SET_YEARS:
            return {
                ...initialState,
                ...action.payload.reduce(
                    (memo, year) => ({ ...memo, [year.name]: year }),
                    {}
                ),
            }

        case ADD_YEAR:
            return {
                ...state,
                [action.payload.name]: action.payload
            }
        case UPDATE_YEAR:
            return {
                ...state,
                [action.payload.name]: action.payload
            }
        case REMOVE_YEAR: 
            return {
                ...(Object.values(state)).filter((year) => (year.id !== action.payload))
            }

        default:
            return state
    }
}