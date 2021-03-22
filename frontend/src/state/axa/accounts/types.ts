import { Account } from '../../../../../backend/src/types/axa';

export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const ADD_ACCOUNT  = 'ADD_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const REFRESH_ACCOUNT = 'REFRESH_ACCOUNT';

interface SetAccountsAction {
    type: typeof SET_ACCOUNTS;
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

interface RefreshAccountAction {
    type: typeof REFRESH_ACCOUNT;
    payload: Account;
}

interface RemoveAccountAction {
    type: typeof REMOVE_ACCOUNT;
    payload: string;
}

export type DispatchSetAccounts = (arg: SetAccountsAction) => (SetAccountsAction);
export type DispatchAddAccount = (arg: AddAccountAction) => (AddAccountAction);
export type DispatchUpdateAccount = (arg: UpdateAccountAction) => (UpdateAccountAction);
export type DispatchRemoveAccount = (arg: RemoveAccountAction) => (RemoveAccountAction);
    
export type ActionTypes = SetAccountsAction | AddAccountAction | UpdateAccountAction | RefreshAccountAction | RemoveAccountAction;
    