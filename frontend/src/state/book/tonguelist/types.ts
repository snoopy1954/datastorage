import { Tongue } from '../../../../../backend/src/types/book';

export const SET_TONGUE_LIST = 'SET_TONGUE_LIST';
export const ADD_TONGUE  = 'ADD_TONGUE';
export const UPDATE_TONGUE = 'UPDATE_TONGUE';
export const REMOVE_TONGUE = 'REMOVE_TONGUE';

interface SetTongueListAction {
    type: typeof SET_TONGUE_LIST;
    payload: Tongue[];
}

interface AddTongueAction {
    type: typeof ADD_TONGUE;
    payload: Tongue;
}

interface UpdateTongueAction {
    type: typeof UPDATE_TONGUE;
    payload: Tongue;
}

interface RemoveTongueAction {
    type: typeof REMOVE_TONGUE;
    payload: string;
}

export type DispatchSetTongueList = (arg: SetTongueListAction) => (SetTongueListAction);
export type DispatchAddTongue = (arg: AddTongueAction) => (AddTongueAction);
export type DispatchUpdateTongue = (arg: UpdateTongueAction) => (UpdateTongueAction);
export type DispatchRemoveTongue = (arg: RemoveTongueAction) => (RemoveTongueAction);
    
export type ActionTypes = SetTongueListAction | AddTongueAction | UpdateTongueAction | RemoveTongueAction;
    