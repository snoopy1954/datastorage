import { Month } from '../../../../../backend/src/types/pressure';
import { SET_MONTH_LIST, ADD_MONTH, UPDATE_MONTH, REMOVE_MONTH, MonthActionTypes } from './types';

const initialState: Month[] = [];

export const monthlistReducer = (state = initialState, action: MonthActionTypes): Month[] => {
    switch (action.type) {
        case SET_MONTH_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, month) => ({ ...memo, [month.id]: month }),
                    {}
                ),
            }
        case ADD_MONTH:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_MONTH:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_MONTH: 
            return {
                ...(Object.values(state)).filter((month) => (month.id !== action.payload))
            }
        default:
            return state
    }
}

