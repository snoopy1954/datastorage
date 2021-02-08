import { Group } from '../../../../../backend/src/types/basic';

export const SET_SELECTED_DOCUMENTGROUP = 'SET_SELECTED_DOCUMENTGROUP';
export const CLEAR_SELECTED_DOCUMENTGROUP = 'CLEAR_SELECTED_DOCUMENTGROUP';

interface SetSelectedGroupAction {
    type: typeof SET_SELECTED_DOCUMENTGROUP;
    payload: Group;
}

interface ClearSelectedGroupAction {
    type: typeof CLEAR_SELECTED_DOCUMENTGROUP;
}

export type ActionTypes = SetSelectedGroupAction | ClearSelectedGroupAction;