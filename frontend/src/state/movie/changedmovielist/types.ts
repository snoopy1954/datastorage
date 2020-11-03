import { Movie } from '../../../../../backend/src/types/movie';

export const ADD_CHANGED_MOVIE  = 'ADD_CHANGED_MOVIE';
export const CLEAR_CHANGED_MOVIE  = 'CLEAR_CHANGED_MOVIE';

interface AddChangedMovieAction {
    type: typeof ADD_CHANGED_MOVIE;
    payload: Movie;
}

interface ClearChangedMovieAction {
    type: typeof CLEAR_CHANGED_MOVIE;
}
    
export type ActionTypes = AddChangedMovieAction | ClearChangedMovieAction;
    