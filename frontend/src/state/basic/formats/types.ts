import { Format } from '../../../../../backend/src/types/basic';

export const SET_FORMATS = 'SET_FORMAT_LIST';
export const ADD_FORMAT  = 'ADD_FORMAT';
export const UPDATE_FORMAT = 'UPDATE_FORMAT';
export const REMOVE_FORMAT = 'REMOVE_FORMAT';

interface SetFormatsAction {
    type: typeof SET_FORMATS;
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
    
export type ActionTypes = SetFormatsAction | AddFormatAction | UpdateFormatAction | RemoveFormatAction;