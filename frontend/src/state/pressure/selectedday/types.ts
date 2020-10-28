import { Day } from '../../../../../backend/src/types/pressure';

export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';
export const CLEAR_SELECTED_DAY = 'CLEAR_SELECTED_DAY';

interface SetSelectedDayAction {
    type: typeof SET_SELECTED_DAY;
    payload: Day;
}

interface ClearSelectedDayAction {
    type: typeof CLEAR_SELECTED_DAY;
}

export type SelectedDayActionTypes = SetSelectedDayAction | ClearSelectedDayAction;