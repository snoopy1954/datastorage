import { Year } from '../../../../../backend/src/types/axa';

export const SET_SELECTED_AXAYEAR = 'SET_SELECTED_AXAYEAR';
export const CLEAR_SELECTED_AXAYEAR = 'CLEAR_SELECTED_AXAYEAR';

interface SetSelectedYearAction {
    type: typeof SET_SELECTED_AXAYEAR;
    payload: Year;
}

interface ClearSelectedYearAction {
    type: typeof CLEAR_SELECTED_AXAYEAR;
}

export type ActionTypes = SetSelectedYearAction | ClearSelectedYearAction;