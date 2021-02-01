import { Transaction } from '../../../../../backend/src/types/account';

export const SET_SELECTED_TRANSACTION = 'SET_SELECTED_TRANSACTION';
export const CLEAR_SELECTED_TRANSACTION = 'CLEAR_SELECTED_TRANSACTION';

interface SetSelectedTransactionAction {
    type: typeof SET_SELECTED_TRANSACTION;
    payload: Transaction;
}

interface ClearSelectedTransactionAction {
    type: typeof CLEAR_SELECTED_TRANSACTION;
}

export type ActionTypes = SetSelectedTransactionAction | ClearSelectedTransactionAction;