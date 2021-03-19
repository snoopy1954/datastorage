import { Month, MonthNoID } from '../../../../../backend/src/types/pressure';
import { 
    SET_MONTHS, 
    ADD_MONTH,
    UPDATE_MONTH,
    REMOVE_MONTH,
    DispatchSetMonths,
    DispatchAddMonth,
    DispatchUpdateMonth,
    DispatchRemoveMonth
} from './types';

import { create, update, remove, getAll } from "../../../services/pressure/months";

import { sortMonthList } from '../../../utils/pressure/month';


export const initializeMonths = () => {
  return async (dispatch: DispatchSetMonths) => {
    const months = sortMonthList(await getAll());
    dispatch({
      type: SET_MONTHS,
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
