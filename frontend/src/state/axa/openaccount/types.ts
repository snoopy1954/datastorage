import { Account } from '../../../../../backend/src/types/axa';

export const SET_OPEN_ACCOUNT = 'SET_OPEN_ACCOUNT';
export const CLEAR_OPEN_ACCOUNT = 'CLEAR_OPEN_ACCOUNT';

interface SetOpenAccountAction {
    type: typeof SET_OPEN_ACCOUNT;
    payload: Account;
}

interface ClearOpenAccountAction {
    type: typeof CLEAR_OPEN_ACCOUNT;
}

export type ActionTypes = SetOpenAccountAction | ClearOpenAccountAction;