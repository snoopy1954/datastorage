import { Os } from '../../../../../backend/src/types/network';

export const SET_OSS = 'SET_OSS';
export const ADD_OS  = 'ADD_OS';
export const UPDATE_OS = 'UPDATE_OS';
export const REMOVE_OS = 'REMOVE_OS';

interface SetOssAction {
    type: typeof SET_OSS;
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

export type DispatchSetOss = (arg: SetOssAction) => (SetOssAction);
export type DispatchAddOs = (arg: AddOsAction) => (AddOsAction);
export type DispatchUpdateOs = (arg: UpdateOsAction) => (UpdateOsAction);
export type DispatchRemoveOs = (arg: RemoveOsAction) => (RemoveOsAction);
    
export type ActionTypes = SetOssAction | AddOsAction | UpdateOsAction | RemoveOsAction;
    