import { Movie } from '../../../../../backend/src/types/movie';

export const SET_SELECTED_MOVIE = 'SET_SELECTED_MOVIE';
export const CLEAR_SELECTED_MOVIE = 'CLEAR_SELECTED_MOVIE';

interface SetSelectedMovieAction {
    type: typeof SET_SELECTED_MOVIE;
    payload: Movie;
}

interface ClearSelectedMovieAction {
    type: typeof CLEAR_SELECTED_MOVIE;
}

export type ActionTypes = SetSelectedMovieAction | ClearSelectedMovieAction;