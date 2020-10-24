import { Format } from '../../../types/book';
import { SET_FORMAT_LIST, ADD_FORMAT, UPDATE_FORMAT, REMOVE_FORMAT, ActionTypes } from './types';

const initialState: Format[] = [];

export const formatlistReducer = (state = initialState, action: ActionTypes): Format[] => {
    switch (action.type) {
        case SET_FORMAT_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, format) => ({ ...memo, [format.id]: format }),
                    {}
                ),
            }
        case ADD_FORMAT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_FORMAT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_FORMAT: 
            return {
                ...(Object.values(state)).filter((format) => (format.id !== action.payload))
            }
        default:
            return state
    }
}

