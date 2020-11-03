import { Movie } from '../../../../../backend/src/types/movie';

export const SET_MOVIE_LIST = 'SET_MOVIE_LIST';
export const ADD_MOVIE  = 'ADD_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';
export const EXCHANGE_MOVIES = 'EXCHANGE_MOVIES';

interface SetMovieListAction {
    type: typeof SET_MOVIE_LIST;
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

export type DispatchSetMovieList = (arg: SetMovieListAction) => (SetMovieListAction);
export type DispatchAddMovie = (arg: AddMovieAction) => (AddMovieAction);
export type DispatchUpdateMovie = (arg: UpdateMovieAction) => (UpdateMovieAction);
export type DispatchRemoveMovie = (arg: RemoveMovieAction) => (RemoveMovieAction);
    
export type ActionTypes = SetMovieListAction | AddMovieAction | UpdateMovieAction | RemoveMovieAction | ExchangeMoviesAction;
    