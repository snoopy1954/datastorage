import { Movie } from '../../../../../backend/src/types/movie';
import { SET_SELECTED_MOVIE, CLEAR_SELECTED_MOVIE, ActionTypes } from './types';
import { newMovie } from '../../../utils/movie';

const movie = newMovie();
const initialState: Movie = {
    id: '',
    ...movie
};

export const selectedmovieReducer = (state = initialState, action: ActionTypes): Movie => {
    switch (action.type) {
        case SET_SELECTED_MOVIE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_SELECTED_MOVIE:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
};