import { Month, MonthNoID } from '../../../types/pressure';
import { 
    SET_MONTH_LIST, 
    ADD_MONTH,
    UPDATE_MONTH,
    REMOVE_MONTH,
    DispatchSetMonthList,
    DispatchAddMonth,
    DispatchUpdateMonth,
    DispatchRemoveMonth
} from './types';

import { create, update, remove, getAll } from "../../../services/pressure/months";

import { sortMonthList } from '../../../utils/pressure';


export const initializeMonths = () => {
  return async (dispatch: DispatchSetMonthList) => {
    const months = sortMonthList(await getAll());
    dispatch({
      type: SET_MONTH_LIST,
      payload: months,
    });
  }
}

export const addMonth = (month: MonthNoID) => {
  return async (dispatch: DispatchAddMonth) => {
    const newMonth = await create(month);
    dispatch({
      type: ADD_MONTH,
      payload: newMonth
    });
  }
};

export const updateMonth = (month: Month) => {
  return async (dispatch: DispatchUpdateMonth) => {
    const newMonth = await update(month.id, month);
    dispatch({
      type: UPDATE_MONTH,
      payload: newMonth
    });
  }
};
  
export const removeMonth = (id: string) => {
  return async (dispatch: DispatchRemoveMonth) => {
    await remove(id);
    dispatch({
      type: REMOVE_MONTH,
      payload: id
    });
  }
};
