import { Month } from '../../../../../backend/src/types/pressure';

export const SET_MONTHS = 'SET_MONTHS';
export const ADD_MONTH  = 'ADD_MONTH';
export const UPDATE_MONTH = 'UPDATE_MONTH';
export const REMOVE_MONTH = 'REMOVE_MONTH';

interface SetMonthsAction {
    type: typeof SET_MONTHS;
    payload: Month[];
}

interface AddMonthAction {
    type: typeof ADD_MONTH;
    payload: Month;
}

interface UpdateMonthAction {
    type: typeof UPDATE_MONTH;
    payload: Month;
}

interface RemoveMonthAction {
    type: typeof REMOVE_MONTH;
    payload: string;
}

export type DispatchSetMonths = (arg: SetMonthsAction) => (SetMonthsAction);
export type DispatchAddMonth = (arg: AddMonthAction) => (AddMonthAction);
export type DispatchUpdateMonth = (arg: UpdateMonthAction) => (UpdateMonthAction);
export type DispatchRemoveMonth = (arg: RemoveMonthAction) => (RemoveMonthAction);

export type ActionTypes = SetMonthsAction | AddMonthAction | UpdateMonthAction | RemoveMonthAction;
