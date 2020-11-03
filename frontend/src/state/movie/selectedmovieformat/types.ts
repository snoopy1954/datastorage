import { Movieformat } from '../../../../../backend/src/types/movie';

export const SET_SELECTED_MOVIEFORMAT = 'SET_SELECTED_MOVIEFORMAT';
export const CLEAR_SELECTED_MOVIEFORMAT = 'CLEAR_SELECTED_MOVIEFORMAT';

interface SetSelectedMovieformatAction {
    type: typeof SET_SELECTED_MOVIEFORMAT;
    payload: Movieformat;
}

interface ClearSelectedMovieformatAction {
    type: typeof CLEAR_SELECTED_MOVIEFORMAT;
}

export type ActionTypes = SetSelectedMovieformatAction | ClearSelectedMovieformatAction;