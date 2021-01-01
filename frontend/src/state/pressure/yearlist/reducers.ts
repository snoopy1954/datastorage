import { Year } from '../../../../../backend/src/types/pressure';

import { SET_YEAR_LIST, ADD_YEAR, UPDATE_YEAR, REMOVE_YEAR, ActionTypes } from './types';

const initialStateYearList: Year[] = [];

export const yearlistReducer = (state = initialStateYearList, action: ActionTypes): Year[] => {
    switch (action.type) {
        case SET_YEAR_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, year) => ({ ...memo, [year.name.name]: year }),
                    {}
                ),
            }

        case ADD_YEAR:
            return {
                ...state,
                [action.payload.name.name]: action.payload
            }
        case UPDATE_YEAR:
            return {
                ...state,
                [action.payload.name.name]: action.payload
            }
        case REMOVE_YEAR: 
            return {
                ...(Object.values(state)).filter((year) => (year.id !== action.payload))
            }

        default:
            return state
    }
}