import { Year } from '../../../../../backend/src/types/basic';

export const SET_SELECTED_SPORTYEAR = 'SET_SELECTED_SPORTYEAR';
export const CLEAR_SELECTED_SPORTYEAR = 'CLEAR_SELECTED_SPORTYEAR';

interface SetSelectedYearAction {
    type: typeof SET_SELECTED_SPORTYEAR;
    payload: Year;
}

interface ClearSelectedYearAction {
    type: typeof CLEAR_SELECTED_SPORTYEAR;
}

export type ActionTypes = SetSelectedYearAction | ClearSelectedYearAction;