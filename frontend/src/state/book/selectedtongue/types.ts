import { Tongue } from '../../../types/book';

export const SET_SELECTED_TONGUE = 'SET_SELECTED_TONGUE';
export const CLEAR_SELECTED_TONGUE = 'CLEAR_SELECTED_TONGUE';

interface SetSelectedTongueAction {
    type: typeof SET_SELECTED_TONGUE;
    payload: Tongue;
}

interface ClearSelectedTongueAction {
    type: typeof CLEAR_SELECTED_TONGUE;
}

export type ActionTypes = SetSelectedTongueAction | ClearSelectedTongueAction;