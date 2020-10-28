import { Bookgroup } from '../../../../../backend/src/types/book';

export const SET_SELECTED_BOOKGROUP = 'SET_SELECTED_BOOKGROUP';
export const CLEAR_SELECTED_BOOKGROUP = 'CLEAR_SELECTED_BOOKGROUP';

interface SetSelectedBookgroupAction {
    type: typeof SET_SELECTED_BOOKGROUP;
    payload: Bookgroup;
}

interface ClearSelectedBookgroupAction {
    type: typeof CLEAR_SELECTED_BOOKGROUP;
}

export type ActionTypes = SetSelectedBookgroupAction | ClearSelectedBookgroupAction;