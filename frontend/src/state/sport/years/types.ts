import { Year } from '../../../../../backend/src/types/basic';

export const SET_SPORTYEARS = 'SET_SPORTYEARS';
export const ADD_SPORTYEAR  = 'ADD_SPORTYEAR';
export const UPDATE_SPORTYEAR = 'UPDATE_SPORTYEAR';
export const REMOVE_SPORTYEAR = 'REMOVE_SPORTYEAR';

interface SetYearsAction {
    type: typeof SET_SPORTYEARS;
    payload: Year[];
}

interface AddYearAction {
    type: typeof ADD_SPORTYEAR;
    payload: Year;
}

interface UpdateYearAction {
    type: typeof UPDATE_SPORTYEAR;
    payload: Year;
}

interface RemoveYearAction {
    type: typeof REMOVE_SPORTYEAR;
    payload: string;
}

export type DispatchSetYears = (arg: SetYearsAction) => (SetYearsAction);
export type DispatchAddYear = (arg: AddYearAction) => (AddYearAction);
export type DispatchUpdateYear = (arg: UpdateYearAction) => (UpdateYearAction);
export type DispatchRemoveYear = (arg: RemoveYearAction) => (RemoveYearAction);
    
export type ActionTypes = SetYearsAction | AddYearAction | UpdateYearAction | RemoveYearAction;
    