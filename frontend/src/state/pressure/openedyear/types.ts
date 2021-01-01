import { Year } from '../../../../../backend/src/types/pressure';

export const SET_OPENED_YEAR = 'SET_OPENED_YEAR';
export const CLEAR_OPENED_YEAR = 'CLEAR_OPENED_YEAR';

interface SetOpenedYearAction {
    type: typeof SET_OPENED_YEAR;
    payload: Year;
}

interface ClearOpenedYearAction {
    type: typeof CLEAR_OPENED_YEAR;
}

export type ActionTypes = SetOpenedYearAction | ClearOpenedYearAction;