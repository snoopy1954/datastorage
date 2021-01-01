import { Year, YearNoID } from '../../../../../backend/src/types/axa';
import { 
    SET_AXAYEAR_LIST, 
    ADD_AXAYEAR,
    UPDATE_AXAYEAR,
    REMOVE_AXAYEAR,
    DispatchSetYears,
    DispatchAddYear,
    DispatchUpdateYear,
    DispatchRemoveYear
} from './types';

import { create, update, remove, getAll } from "../../../services/axa/year";

import { sortYears } from '../../../utils/axa/year';


export const initializeYears = () => {
  return async (dispatch: DispatchSetYears) => {
    const years = sortYears(await getAll());
    dispatch({
      type: SET_AXAYEAR_LIST,
      payload: years,
    });
  }
}

export const addYear = (year: YearNoID) => {
  return async (dispatch: DispatchAddYear) => {
    const newYear = await create(year);
    dispatch({
      type: ADD_AXAYEAR,
      payload: newYear
    });
  }
};

export const updateYear = (year: Year) => {
  return async (dispatch: DispatchUpdateYear) => {
    const newYear = await update(year.id, year);
    dispatch({
      type: UPDATE_AXAYEAR,
      payload: newYear
    });
  }
};
  
export const removeYear = (id: string) => {
  return async (dispatch: DispatchRemoveYear) => {
    await remove(id);
    dispatch({
      type: REMOVE_AXAYEAR,
      payload: id
    });
  }
};
