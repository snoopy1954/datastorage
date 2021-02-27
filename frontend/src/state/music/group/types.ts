import { Group } from '../../../../../backend/src/types/basic';

export const SET_SELECTED_MUSICGROUP = 'SET_SELECTED_MUSICGROUP';
export const CLEAR_SELECTED_MUSICGROUP = 'CLEAR_SELECTED_MUSICGROUP';

interface SetSelectedGroupAction {
    type: typeof SET_SELECTED_MUSICGROUP;
    payload: Group;
}

interface ClearSelectedGroupAction {
    type: typeof CLEAR_SELECTED_MUSICGROUP;
}

export type ActionTypes = SetSelectedGroupAction | ClearSelectedGroupAction;