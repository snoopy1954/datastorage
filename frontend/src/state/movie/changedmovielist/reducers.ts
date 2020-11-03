import { Movie } from '../../../../../backend/src/types/movie';
import { ADD_CHANGED_MOVIE, CLEAR_CHANGED_MOVIE, ActionTypes } from './types';

const initialState: Movie[] = [];

export const changedmovielistReducer = (state = initialState, action: ActionTypes): Movie[] => {
    switch (action.type) {
        case ADD_CHANGED_MOVIE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case CLEAR_CHANGED_MOVIE:
            return {
                ...initialState
            }
        default:
            return state
    }
}

