import { Os } from '../../../../../backend/src/types/network';

export const SET_OS_LIST = 'SET_OS_LIST';
export const ADD_OS  = 'ADD_OS';
export const UPDATE_OS = 'UPDATE_OS';
export const REMOVE_OS = 'REMOVE_OS';

interface SetOsListAction {
    type: typeof SET_OS_LIST;
    payload: Os[];
}

interface AddOsAction {
    type: typeof ADD_OS;
    payload: Os;
}

interface UpdateOsAction {
    type: typeof UPDATE_OS;
    payload: Os;
}

interface RemoveOsAction {
    type: typeof REMOVE_OS;
    payload: string;
}

export type DispatchSetOsList = (arg: SetOsListAction) => (SetOsListAction);
export type DispatchAddOs = (arg: AddOsAction) => (AddOsAction);
export type DispatchUpdateOs = (arg: UpdateOsAction) => (UpdateOsAction);
export type DispatchRemoveOs = (arg: RemoveOsAction) => (RemoveOsAction);
    
export type ActionTypes = SetOsListAction | AddOsAction | UpdateOsAction | RemoveOsAction;
    