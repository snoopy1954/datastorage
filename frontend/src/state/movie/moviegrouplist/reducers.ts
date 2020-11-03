import { Moviegroup } from '../../../../../backend/src/types/movie';
import { SET_MOVIEGROUP_LIST, ADD_MOVIEGROUP, UPDATE_MOVIEGROUP, REMOVE_MOVIEGROUP, ActionTypes } from './types';

const initialState: Moviegroup[] = [];

export const moviegrouplistReducer = (state = initialState, action: ActionTypes): Moviegroup[] => {
    switch (action.type) {
        case SET_MOVIEGROUP_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, moviegroup) => ({ ...memo, [moviegroup.id]: moviegroup }),
                    {}
                ),
            }
        case ADD_MOVIEGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_MOVIEGROUP:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_MOVIEGROUP: 
            return {
                ...(Object.values(state)).filter((moviegroup) => (moviegroup.id !== action.payload))
            }
        default:
            return state
    }
}

