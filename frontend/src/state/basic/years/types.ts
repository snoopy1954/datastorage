import { Year } from '../../../../../backend/src/types/basic';

export const SET_YEARS = 'SET_YEAR_LIST';
export const ADD_YEAR  = 'ADD_YEAR';
export const UPDATE_YEAR = 'UPDATE_YEAR';
export const REMOVE_YEAR = 'REMOVE_YEAR';

interface SetYearsAction {
    type: typeof SET_YEARS;
    payload: Year[];
}

interface AddYearAction {
    type: typeof ADD_YEAR;
    payload: Year;
}

interface UpdateYearAction {
    type: typeof UPDATE_YEAR;
    payload: Year;
}

interface RemoveYearAction {
    type: typeof REMOVE_YEAR;
    payload: string;
}
    
export type ActionTypes = SetYearsAction | AddYearAction | UpdateYearAction | RemoveYearAction;