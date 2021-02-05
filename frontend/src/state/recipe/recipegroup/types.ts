import { Group } from '../../../../../backend/src/types/basic';

export const SET_SELECTED_RECIPEGROUP = 'SET_SELECTED_RECIPEGROUP';
export const CLEAR_SELECTED_RECIPEGROUP = 'CLEAR_SELECTED_RECIPEGROUP';

interface SetSelectedGroupAction {
    type: typeof SET_SELECTED_RECIPEGROUP;
    payload: Group;
}

interface ClearSelectedGroupAction {
    type: typeof CLEAR_SELECTED_RECIPEGROUP;
}

export type ActionTypes = SetSelectedGroupAction | ClearSelectedGroupAction;