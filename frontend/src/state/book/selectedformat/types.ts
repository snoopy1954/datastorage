import { Format } from '../../../types/book';

export const SET_SELECTED_FORMAT = 'SET_SELECTED_FORMAT';
export const CLEAR_SELECTED_FORMAT = 'CLEAR_SELECTED_FORMAT';

interface SetSelectedFormatAction {
    type: typeof SET_SELECTED_FORMAT;
    payload: Format;
}

interface ClearSelectedFormatAction {
    type: typeof CLEAR_SELECTED_FORMAT;
}

export type ActionTypes = SetSelectedFormatAction | ClearSelectedFormatAction;