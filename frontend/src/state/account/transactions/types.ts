import { Transaction } from '../../../../../backend/src/types/account';

export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const ADD_TRANSACTION  = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';

interface SetTransactionsAction {
    type: typeof SET_TRANSACTIONS;
    payload: Transaction[];
}

interface AddTransactionAction {
    type: typeof ADD_TRANSACTION;
    payload: Transaction;
}

interface UpdateTransactionAction {
    type: typeof UPDATE_TRANSACTION;
    payload: Transaction;
}

interface RemoveTransactionAction {
    type: typeof REMOVE_TRANSACTION;
    payload: string;
}

export type DispatchSetTransactions = (arg: SetTransactionsAction) => (SetTransactionsAction);
export type DispatchAddTransaction = (arg: AddTransactionAction) => (AddTransactionAction);
export type DispatchUpdateTransaction = (arg: UpdateTransactionAction) => (UpdateTransactionAction);
export type DispatchRemoveTransaction = (arg: RemoveTransactionAction) => (RemoveTransactionAction);
    
export type ActionTypes = SetTransactionsAction | AddTransactionAction | UpdateTransactionAction | RemoveTransactionAction;
    