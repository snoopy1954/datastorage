import { Format } from '../../../../../backend/src/types/basic';

export const SET_MOVIEFORMAT_LIST = 'SET_MOVIEFORMAT_LIST';
export const ADD_MOVIEFORMAT  = 'ADD_MOVIEFORMAT';
export const UPDATE_MOVIEFORMAT = 'UPDATE_MOVIEFORMAT';
export const REMOVE_MOVIEFORMAT = 'REMOVE_MOVIEFORMAT';

interface SetMovieformatListAction {
    type: typeof SET_MOVIEFORMAT_LIST;
    payload: Format[];
}

interface AddMovieformatAction {
    type: typeof ADD_MOVIEFORMAT;
    payload: Format;
}

interface UpdateMovieformatAction {
    type: typeof UPDATE_MOVIEFORMAT;
    payload: Format;
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
    