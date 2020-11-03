import { Movie } from '../../../../../backend/src/types/movie';
import { SET_MOVIE_LIST, ADD_MOVIE, UPDATE_MOVIE, REMOVE_MOVIE, EXCHANGE_MOVIES, ActionTypes } from './types';

const initialState: Movie[] = [];

export const movielistReducer = (state = initialState, action: ActionTypes): Movie[] => {
    switch (action.type) {
        case SET_MOVIE_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, movie) => ({ ...memo, [movie.id]: movie }),
                    {}
                ),
            }
        case ADD_MOVIE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_MOVIE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_MOVIE: 
            return {
                ...(Object.values(state)).filter((movie) => (movie.id !== action.payload))
            }
        case EXCHANGE_MOVIES:
            return {
                ...state,
                [action.payload[0].id]: action.payload[0],
                [action.payload[1].id]: action.payload[1],
            }
        default:
            return state
    }
}

