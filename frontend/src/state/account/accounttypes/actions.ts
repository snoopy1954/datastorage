import { Accounttype, AccounttypeNoID } from '../../../../../backend/src/types/account';
import { 
    SET_ACCOUNTTYPES, 
    ADD_ACCOUNTTYPE,
    UPDATE_ACCOUNTTYPE,
    REMOVE_ACCOUNTTYPE,
    DispatchSetAccounttypeList,
    DispatchAddAccounttype,
    DispatchUpdateAccounttype,
    DispatchRemoveAccounttype
} from './types';

import { create, update, remove, getAll } from "../../../services/account/accounttypes";

import { sortAccounttypes } from '../../../utils/account/accounttype';

export const initializeAccounttypes = () => {
  return async (dispatch: DispatchSetAccounttypeList) => {
    const accounttypes = sortAccounttypes(await getAll());
    dispatch({
      type: SET_ACCOUNTTYPES,
      payload: accounttypes,
    });
  }
}

export const addAccounttype = (accounttype: AccounttypeNoID) => {
  return async (dispatch: DispatchAddAccounttype) => {
    const newAccounttype = await create(accounttype);
    dispatch({
      type: ADD_ACCOUNTTYPE,
      payload: newAccounttype
    });
  }
};

export const updateAccounttype = (accounttype: Accounttype) => {
  return async (dispatch: DispatchUpdateAccounttype) => {
    const newAccounttype = await update(accounttype.id, accounttype);
    dispatch({
      type: UPDATE_ACCOUNTTYPE,
      payload: newAccounttype
    });
  }
};
  
export const removeAccounttype = (id: string) => {
  return async (dispatch: DispatchRemoveAccounttype) => {
    await remove(id);
    dispatch({
      type: REMOVE_ACCOUNTTYPE,
      payload: id
    });
  }
};
