import { Movie } from '../../../../../backend/src/types/movie';
import { SET_SELECTED_MOVIE, CLEAR_SELECTED_MOVIE, ActionTypes } from './types';

export const setSelectedMovie = (movie: Movie) => {
    const action: ActionTypes = {
        type: SET_SELECTED_MOVIE,
        payload: movie
    };
    
    return action;  
}

export const clearSelectedMovie = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_MOVIE
    };
    
    return action;  
}

