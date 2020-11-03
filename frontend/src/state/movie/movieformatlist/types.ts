import { Movieformat } from '../../../../../backend/src/types/movie';

export const SET_MOVIEFORMAT_LIST = 'SET_MOVIEFORMAT_LIST';
export const ADD_MOVIEFORMAT  = 'ADD_MOVIEFORMAT';
export const UPDATE_MOVIEFORMAT = 'UPDATE_MOVIEFORMAT';
export const REMOVE_MOVIEFORMAT = 'REMOVE_MOVIEFORMAT';

interface SetMovieformatListAction {
    type: typeof SET_MOVIEFORMAT_LIST;
    payload: Movieformat[];
}

interface AddMovieformatAction {
    type: typeof ADD_MOVIEFORMAT;
    payload: Movieformat;
}

interface UpdateMovieformatAction {
    type: typeof UPDATE_MOVIEFORMAT;
    payload: Movieformat;
}

interface RemoveMovieformatAction {
    type: typeof REMOVE_MOVIEFORMAT;
    payload: string;
}

export type DispatchSetMovieformatList = (arg: SetMovieformatListAction) => (SetMovieformatListAction);
export type DispatchAddMovieformat = (arg: AddMovieformatAction) => (AddMovieformatAction);
export type DispatchUpdateMovieformat = (arg: UpdateMovieformatAction) => (UpdateMovieformatAction);
export type DispatchRemoveMovieformat = (arg: RemoveMovieformatAction) => (RemoveMovieformatAction);
    
export type ActionTypes = SetMovieformatListAction | AddMovieformatAction | UpdateMovieformatAction | RemoveMovieformatAction;
    