import { Year } from '../../../../../backend/src/types/pressure';

export const SET_SELECTED_YEAR = 'SET_SELECTED_YEAR';
export const CLEAR_SELECTED_YEAR = 'CLEAR_SELECTED_YEAR';

interface SetSelectedYearAction {
    type: typeof SET_SELECTED_YEAR;
    payload: Year;
}

interface ClearSelectedYearAction {
    type: typeof CLEAR_SELECTED_YEAR;
}

export type SelectedYearActionTypes = SetSelectedYearAction | ClearSelectedYearAction;