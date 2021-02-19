import { Group } from '../../../../../backend/src/types/basic';

export const SET_SELECTED_SPORTGROUP = 'SET_SELECTED_SPORTGROUP';
export const CLEAR_SELECTED_SPORTGROUP = 'CLEAR_SELECTED_SPORTGROUP';

interface SetSelectedGroupAction {
    type: typeof SET_SELECTED_SPORTGROUP;
    payload: Group;
}

interface ClearSelectedGroupAction {
    type: typeof CLEAR_SELECTED_SPORTGROUP;
}

export type ActionTypes = SetSelectedGroupAction | ClearSelectedGroupAction;