import { Month } from '../../../../../backend/src/types/pressure';

export const SET_MONTH_LIST = 'SET_MONTH_LIST';
export const ADD_MONTH  = 'ADD_MONTH';
export const UPDATE_MONTH = 'UPDATE_MONTH';
export const REMOVE_MONTH = 'REMOVE_MONTH';

interface SetMonthListAction {
    type: typeof SET_MONTH_LIST;
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

export type DispatchSetMonthList = (arg: SetMonthListAction) => (SetMonthListAction);
export type DispatchAddMonth = (arg: AddMonthAction) => (AddMonthAction);
export type DispatchUpdateMonth = (arg: UpdateMonthAction) => (UpdateMonthAction);
export type DispatchRemoveMonth = (arg: RemoveMonthAction) => (RemoveMonthAction);

export type MonthActionTypes = SetMonthListAction | AddMonthAction | UpdateMonthAction | RemoveMonthAction;
