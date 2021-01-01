import { Year } from '../../../../../backend/src/types/pressure';

export const SET_YEAR_LIST = 'SET_YEAR_LIST';
export const ADD_YEAR  = 'ADD_YEAR';
export const UPDATE_YEAR = 'UPDATE_YEAR';
export const REMOVE_YEAR = 'REMOVE_YEAR';

interface SetYearListAction {
    type: typeof SET_YEAR_LIST;
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

export type DispatchSetYearList = (arg: SetYearListAction) => (SetYearListAction);
export type DispatchAddYear = (arg: AddYearAction) => (AddYearAction);
export type DispatchUpdateYear = (arg: UpdateYearAction) => (UpdateYearAction);
export type DispatchRemoveYear = (arg: RemoveYearAction) => (RemoveYearAction);
    
export type ActionTypes = SetYearListAction | AddYearAction | UpdateYearAction | RemoveYearAction;