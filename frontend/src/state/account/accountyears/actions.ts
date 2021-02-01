import { Accountyear, AccountyearNoID } from '../../../../../backend/src/types/account';
import { 
    SET_ACCOUNTYEARS, 
    ADD_ACCOUNTYEAR,
    UPDATE_ACCOUNTYEAR,
    REMOVE_ACCOUNTYEAR,
    DispatchSetAccountyears,
    DispatchAddAccountyear,
    DispatchUpdateAccountyear,
    DispatchRemoveAccountyear
} from './types';

import { create, update, remove, getAll } from '../../../services/account/accountyears';

import { sortAccountyears } from '../../../utils/account/accountyear';


export const initializeAccountyears = () => {
  return async (dispatch: DispatchSetAccountyears) => {
    const years = sortAccountyears(await getAll());
    dispatch({
      type: SET_ACCOUNTYEARS,
      payload: years,
    });
  }
}

export const addAccountyear = (year: AccountyearNoID) => {
  return async (dispatch: DispatchAddAccountyear) => {
    const newAccountyear = await create(year);
    dispatch({
      type: ADD_ACCOUNTYEAR,
      payload: newAccountyear
    });
  }
};

export const updateAccountyear = (year: Accountyear) => {
  return async (dispatch: DispatchUpdateAccountyear) => {
    const newAccountyear = await update(year.id, year);
    dispatch({
      type: UPDATE_ACCOUNTYEAR,
      payload: newAccountyear
    });
  }
};
  
export const removeAccountyear = (id: string) => {
  return async (dispatch: DispatchRemoveAccountyear) => {
    await remove(id);
    dispatch({
      type: REMOVE_ACCOUNTYEAR,
      payload: id
    });
  }
};
