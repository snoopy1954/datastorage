import { Month } from '../../../../../backend/src/types/pressure';

export const SET_SELECTED_MONTH = 'SET_SELECTED_MONTH';
export const CLEAR_SELECTED_MONTH = 'CLEAR_SELECTED_MONTH';

interface SetSelectedMonthAction {
    type: typeof SET_SELECTED_MONTH;
    payload: Month;
}

interface ClearSelectedMonthAction {
    type: typeof CLEAR_SELECTED_MONTH;
}

export type SelectedMonthActionTypes = SetSelectedMonthAction | ClearSelectedMonthAction;