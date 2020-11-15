import { Account } from '../../../../../backend/src/types/axa';

export const SET_SELECTED_ACCOUNT = 'SET_SELECTED_ACCOUNT';
export const CLEAR_SELECTED_ACCOUNT = 'CLEAR_SELECTED_ACCOUNT';

interface SetSelectedAccountAction {
    type: typeof SET_SELECTED_ACCOUNT;
    payload: Account;
}

interface ClearSelectedAccountAction {
    type: typeof CLEAR_SELECTED_ACCOUNT;
}

export type ActionTypes = SetSelectedAccountAction | ClearSelectedAccountAction;