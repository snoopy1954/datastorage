import { Tongue } from '../../../../../backend/src/types/book';
import { SET_TONGUE_LIST, ADD_TONGUE, UPDATE_TONGUE, REMOVE_TONGUE, ActionTypes } from './types';

const initialState: Tongue[] = [];

export const tonguesReducer = (state = initialState, action: ActionTypes): Tongue[] => {
    switch (action.type) {
        case SET_TONGUE_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, tongue) => ({ ...memo, [tongue.id]: tongue }),
                    {}
                ),
            }
        case ADD_TONGUE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_TONGUE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_TONGUE: 
            return {
                ...(Object.values(state)).filter((tongue) => (tongue.id !== action.payload))
            }
        default:
            return state
    }
}

