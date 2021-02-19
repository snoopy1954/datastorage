import { Year, YearNoID } from '../../../../../backend/src/types/basic';
import { 
    SET_SPORTYEARS, 
    ADD_SPORTYEAR,
    UPDATE_SPORTYEAR,
    REMOVE_SPORTYEAR,
    DispatchSetYears,
    DispatchAddYear,
    DispatchUpdateYear,
    DispatchRemoveYear
} from './types';

import { create, update, remove, getAll } from '../../../services/sport/years';

import { sortYears } from '../../../utils/basic/year';


export const initializeYears = () => {
  return async (dispatch: DispatchSetYears) => {
    const years = sortYears(await getAll());
    dispatch({
      type: SET_SPORTYEARS,
      payload: years,
    });
  }
}

export const addYear = (year: YearNoID) => {
  return async (dispatch: DispatchAddYear) => {
    const newYear = await create(year);
    dispatch({
      type: ADD_SPORTYEAR,
      payload: newYear
    });
  }
};

export const updateYear = (year: Year) => {
  return async (dispatch: DispatchUpdateYear) => {
    const newYear = await update(year.id, year);
    dispatch({
      type: UPDATE_SPORTYEAR,
      payload: newYear
    });
  }
};
  
export const removeYear = (id: string) => {
  return async (dispatch: DispatchRemoveYear) => {
    await remove(id);
    dispatch({
      type: REMOVE_SPORTYEAR,
      payload: id
    });
  }
};
