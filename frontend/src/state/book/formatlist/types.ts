import { Format } from '../../../../../backend/src/types/book';

export const SET_FORMAT_LIST = 'SET_FORMAT_LIST';
export const ADD_FORMAT  = 'ADD_FORMAT';
export const UPDATE_FORMAT = 'UPDATE_FORMAT';
export const REMOVE_FORMAT = 'REMOVE_FORMAT';

interface SetFormatListAction {
    type: typeof SET_FORMAT_LIST;
    payload: Format[];
}

interface AddFormatAction {
    type: typeof ADD_FORMAT;
    payload: Format;
}

interface UpdateFormatAction {
    type: typeof UPDATE_FORMAT;
    payload: Format;
}

interface RemoveFormatAction {
    type: typeof REMOVE_FORMAT;
    payload: string;
}

export type DispatchSetFormatList = (arg: SetFormatListAction) => (SetFormatListAction);
export type DispatchAddFormat = (arg: AddFormatAction) => (AddFormatAction);
export type DispatchUpdateFormat = (arg: UpdateFormatAction) => (UpdateFormatAction);
export type DispatchRemoveFormat = (arg: RemoveFormatAction) => (RemoveFormatAction);
    
export type ActionTypes = SetFormatListAction | AddFormatAction | UpdateFormatAction | RemoveFormatAction;
    