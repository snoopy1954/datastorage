import { Transaction, TransactionNoID } from '../../../../../backend/src/types/account';
import { 
    SET_TRANSACTIONS, 
    ADD_TRANSACTION,
    UPDATE_TRANSACTION,
    REMOVE_TRANSACTION,
    DispatchSetTransactions,
    DispatchAddTransaction,
    DispatchUpdateTransaction,
    DispatchRemoveTransaction
} from './types';

import { create, update, remove, getAll } from '../../../services/account/transactions';

import { sortTransactions } from '../../../utils/account/transaction';


export const initializeTransactions = () => {
  return async (dispatch: DispatchSetTransactions) => {
    const years = sortTransactions(await getAll());
    dispatch({
      type: SET_TRANSACTIONS,
      payload: years,
    });
  }
}

export const addTransaction = (year: TransactionNoID) => {
  return async (dispatch: DispatchAddTransaction) => {
    const newTransaction = await create(year);
    dispatch({
      type: ADD_TRANSACTION,
      payload: newTransaction
    });
  }
};

export const updateTransaction = (year: Transaction) => {
  return async (dispatch: DispatchUpdateTransaction) => {
    const newTransaction = await update(year.id, year);
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: newTransaction
    });
  }
};
  
export const removeTransaction = (id: string) => {
  return async (dispatch: DispatchRemoveTransaction) => {
    await remove(id);
    dispatch({
      type: REMOVE_TRANSACTION,
      payload: id
    });
  }
};
