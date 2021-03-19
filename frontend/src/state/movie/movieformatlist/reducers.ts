import { Format } from '../../../../../backend/src/types/basic';
import { SET_MOVIEFORMAT_LIST, ADD_MOVIEFORMAT, UPDATE_MOVIEFORMAT, REMOVE_MOVIEFORMAT, ActionTypes } from './types';

const initialState: Format[] = [];

export const movieformatlistReducer = (state = initialState, action: ActionTypes): Format[] => {
    switch (action.type) {
        case SET_MOVIEFORMAT_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, movieformat) => ({ ...memo, [movieformat.id]: movieformat }),
                    {}
                ),
            }
        case ADD_MOVIEFORMAT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_MOVIEFORMAT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_MOVIEFORMAT: 
            return {
                ...(Object.values(state)).filter((movieformat) => (movieformat.id !== action.payload))
            }
        default:
            return state
    }
}

