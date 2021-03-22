import { Account, AccountNoID } from '../../../../../backend/src/types/axa';
import { 
    SET_ACCOUNTS, 
    ADD_ACCOUNT,
    UPDATE_ACCOUNT,
    REMOVE_ACCOUNT,
    REFRESH_ACCOUNT,
    DispatchSetAccounts,
    DispatchAddAccount,
    DispatchUpdateAccount,
    DispatchRemoveAccount,
    ActionTypes
} from './types';

import { create, update, remove, getAll } from "../../../services/axa/accounts";

import { sortAccounts } from '../../../utils/axa/account';


export const initializeAccounts = () => {
  return async (dispatch: DispatchSetAccounts) => {
    const accounts = sortAccounts(await getAll());
    dispatch({
      type: SET_ACCOUNTS,
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
  const action: ActionTypes = {
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
