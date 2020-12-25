import { Year } from '../../../../../backend/src/types/axa';

export const SET_AXAYEAR_LIST = 'SET_AXAYEAR_LIST';
export const ADD_AXAYEAR  = 'ADD_AXAYEAR';
export const UPDATE_AXAYEAR = 'UPDATE_AXAYEAR';
export const REMOVE_AXAYEAR = 'REMOVE_AXAYEAR';

interface SetYearsAction {
    type: typeof SET_AXAYEAR_LIST;
    payload: Year[];
}

interface AddYearAction {
    type: typeof ADD_AXAYEAR;
    payload: Year;
}

interface UpdateYearAction {
    type: typeof UPDATE_AXAYEAR;
    payload: Year;
}

interface RemoveYearAction {
    type: typeof REMOVE_AXAYEAR;
    payload: string;
}

export type DispatchSetYears = (arg: SetYearsAction) => (SetYearsAction);
export type DispatchAddYear = (arg: AddYearAction) => (AddYearAction);
export type DispatchUpdateYear = (arg: UpdateYearAction) => (UpdateYearAction);
export type DispatchRemoveYear = (arg: RemoveYearAction) => (RemoveYearAction);
    
export type YearActionTypes = SetYearsAction | AddYearAction | UpdateYearAction | RemoveYearAction;
    