import { Accountyear } from '../../../../../backend/src/types/account';

export const SET_ACCOUNTYEARS = 'SET_ACCOUNTYEARS';
export const ADD_ACCOUNTYEAR  = 'ADD_ACCOUNTYEAR';
export const UPDATE_ACCOUNTYEAR = 'UPDATE_ACCOUNTYEAR';
export const REMOVE_ACCOUNTYEAR = 'REMOVE_ACCOUNTYEAR';

interface SetAccountyearsAction {
    type: typeof SET_ACCOUNTYEARS;
    payload: Accountyear[];
}

interface AddAccountyearAction {
    type: typeof ADD_ACCOUNTYEAR;
    payload: Accountyear;
}

interface UpdateAccountyearAction {
    type: typeof UPDATE_ACCOUNTYEAR;
    payload: Accountyear;
}

interface RemoveAccountyearAction {
    type: typeof REMOVE_ACCOUNTYEAR;
    payload: string;
}

export type DispatchSetAccountyears = (arg: SetAccountyearsAction) => (SetAccountyearsAction);
export type DispatchAddAccountyear = (arg: AddAccountyearAction) => (AddAccountyearAction);
export type DispatchUpdateAccountyear = (arg: UpdateAccountyearAction) => (UpdateAccountyearAction);
export type DispatchRemoveAccountyear = (arg: RemoveAccountyearAction) => (RemoveAccountyearAction);
    
export type ActionTypes = SetAccountyearsAction | AddAccountyearAction | UpdateAccountyearAction | RemoveAccountyearAction;
    