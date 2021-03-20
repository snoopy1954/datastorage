import { Movie } from '../../../../../backend/src/types/movie';

export const SET_MOVIES = 'SET_MOVIES';
export const ADD_MOVIE  = 'ADD_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';
export const EXCHANGE_MOVIES = 'EXCHANGE_MOVIES';

interface SetMoviesAction {
    type: typeof SET_MOVIES;
    payload: Movie[];
}

interface AddMovieAction {
    type: typeof ADD_MOVIE;
    payload: Movie;
}

interface UpdateMovieAction {
    type: typeof UPDATE_MOVIE;
    payload: Movie;
}

interface RemoveMovieAction {
    type: typeof REMOVE_MOVIE;
    payload: string;
}

interface ExchangeMoviesAction {
    type: typeof EXCHANGE_MOVIES;
    payload: Movie[];
}

export type DispatchSetMovies = (arg: SetMoviesAction) => (SetMoviesAction);
export type DispatchAddMovie = (arg: AddMovieAction) => (AddMovieAction);
export type DispatchUpdateMovie = (arg: UpdateMovieAction) => (UpdateMovieAction);
export type DispatchRemoveMovie = (arg: RemoveMovieAction) => (RemoveMovieAction);
    
export type ActionTypes = SetMoviesAction | AddMovieAction | UpdateMovieAction | RemoveMovieAction | ExchangeMoviesAction;
    