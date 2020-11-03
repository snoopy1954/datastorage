import { Moviegroup } from '../../../../../backend/src/types/movie';

export const SET_MOVIEGROUP_LIST = 'SET_MOVIEGROUP_LIST';
export const ADD_MOVIEGROUP  = 'ADD_MOVIEGROUP';
export const UPDATE_MOVIEGROUP = 'UPDATE_MOVIEGROUP';
export const REMOVE_MOVIEGROUP = 'REMOVE_MOVIEGROUP';

interface SetMoviegroupListAction {
    type: typeof SET_MOVIEGROUP_LIST;
    payload: Moviegroup[];
}

interface AddMoviegroupAction {
    type: typeof ADD_MOVIEGROUP;
    payload: Moviegroup;
}

interface UpdateMoviegroupAction {
    type: typeof UPDATE_MOVIEGROUP;
    payload: Moviegroup;
}

interface RemoveMoviegroupAction {
    type: typeof REMOVE_MOVIEGROUP;
    payload: string;
}

export type DispatchSetMoviegroupList = (arg: SetMoviegroupListAction) => (SetMoviegroupListAction);
export type DispatchAddMoviegroup = (arg: AddMoviegroupAction) => (AddMoviegroupAction);
export type DispatchUpdateMoviegroup = (arg: UpdateMoviegroupAction) => (UpdateMoviegroupAction);
export type DispatchRemoveMoviegroup = (arg: RemoveMoviegroupAction) => (RemoveMoviegroupAction);
    
export type ActionTypes = SetMoviegroupListAction | AddMoviegroupAction | UpdateMoviegroupAction | RemoveMoviegroupAction;
    