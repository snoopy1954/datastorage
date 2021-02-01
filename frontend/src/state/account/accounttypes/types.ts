import { Accounttype } from '../../../../../backend/src/types/account';

export const SET_ACCOUNTTYPES = 'SET_ACCOUNTTYPES';
export const ADD_ACCOUNTTYPE  = 'ADD_ACCOUNTTYPE';
export const UPDATE_ACCOUNTTYPE = 'UPDATE_ACCOUNTTYPE';
export const REMOVE_ACCOUNTTYPE = 'REMOVE_ACCOUNTTYPE';

interface SetAccounttypeListAction {
    type: typeof SET_ACCOUNTTYPES;
    payload: Accounttype[];
}

interface AddAccounttypeAction {
    type: typeof ADD_ACCOUNTTYPE;
    payload: Accounttype;
}

interface UpdateAccounttypeAction {
    type: typeof UPDATE_ACCOUNTTYPE;
    payload: Accounttype;
}

interface RemoveAccounttypeAction {
    type: typeof REMOVE_ACCOUNTTYPE;
    payload: string;
}

export type DispatchSetAccounttypeList = (arg: SetAccounttypeListAction) => (SetAccounttypeListAction);
export type DispatchAddAccounttype = (arg: AddAccounttypeAction) => (AddAccounttypeAction);
export type DispatchUpdateAccounttype = (arg: UpdateAccounttypeAction) => (UpdateAccounttypeAction);
export type DispatchRemoveAccounttype = (arg: RemoveAccounttypeAction) => (RemoveAccounttypeAction);
    
export type ActionTypes = SetAccounttypeListAction | AddAccounttypeAction | UpdateAccounttypeAction | RemoveAccounttypeAction;
    