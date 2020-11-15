import { Account } from '../../../../../backend/src/types/axa';

export const SET_ACCOUNT_LIST = 'SET_ACCOUNT_LIST';
export const ADD_ACCOUNT  = 'ADD_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

interface SetAccountListAction {
    type: typeof SET_ACCOUNT_LIST;
    payload: Account[];
}

interface AddAccountAction {
    type: typeof ADD_ACCOUNT;
    payload: Account;
}

interface UpdateAccountAction {
    type: typeof UPDATE_ACCOUNT;
    payload: Account;
}

interface RemoveAccountAction {
    type: typeof REMOVE_ACCOUNT;
    payload: string;
}

export type DispatchSetAccountList = (arg: SetAccountListAction) => (SetAccountListAction);
export type DispatchAddAccount = (arg: AddAccountAction) => (AddAccountAction);
export type DispatchUpdateAccount = (arg: UpdateAccountAction) => (UpdateAccountAction);
export type DispatchRemoveAccount = (arg: RemoveAccountAction) => (RemoveAccountAction);
    
export type AccountActionTypes = SetAccountListAction | AddAccountAction | UpdateAccountAction | RemoveAccountAction;
    