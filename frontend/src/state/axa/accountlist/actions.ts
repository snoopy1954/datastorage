import { Account, AccountNoID } from '../../../../../backend/src/types/axa';
import { 
    SET_ACCOUNT_LIST, 
    ADD_ACCOUNT,
    UPDATE_ACCOUNT,
    REMOVE_ACCOUNT,
    REFRESH_ACCOUNT,
    DispatchSetAccountList,
    DispatchAddAccount,
    DispatchUpdateAccount,
    DispatchRemoveAccount,
    AccountActionTypes
} from './types';

import { create, update, remove, getAll } from "../../../services/axa/accounts";

import { sortAccounts } from '../../../utils/axa/account';


export const initializeAccounts = () => {
  return async (dispatch: DispatchSetAccountList) => {
    const accounts = sortAccounts(await getAll());
    dispatch({
      type: SET_ACCOUNT_LIST,
      payload: accounts,
    });
  }
}

export const addAccount = (account: AccountNoID) => {
  return async (dispatch: DispatchAddAccount) => {
    const newAccount = await create(account);
    dispatch({
      type: ADD_ACCOUNT,
      payload: newAccount
    });
  }
};

export const updateAccount = (account: Account) => {
  return async (dispatch: DispatchUpdateAccount) => {
    const newAccount = await update(account.id, account);
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: newAccount
    });
  }
};

export const refreshAccount = (account: Account) => {
  const action: AccountActionTypes = {
    type: REFRESH_ACCOUNT,
    payload: account
  };

  return action;  
};
  
export const removeAccount = (id: string) => {
  return async (dispatch: DispatchRemoveAccount) => {
    await remove(id);
    dispatch({
      type: REMOVE_ACCOUNT,
      payload: id
    });
  }
};
