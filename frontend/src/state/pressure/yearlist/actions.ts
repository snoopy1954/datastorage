import { Year, YearNoID } from '../../../../../backend/src/types/pressure';

import { SET_YEAR_LIST, ADD_YEAR, UPDATE_YEAR, REMOVE_YEAR,    
    DispatchSetYearList,
    DispatchAddYear,
    DispatchUpdateYear,
    DispatchRemoveYear
 } from './types';

import { create, update, remove, getAll } from "../../../services/pressure/years";


export const initializeYears = () => {
    return async (dispatch: DispatchSetYearList) => {
      const years = await getAll();
      dispatch({
        type: SET_YEAR_LIST,
        payload: years,
      });
    }
  }
  
  export const addYear = (year: YearNoID) => {
    return async (dispatch: DispatchAddYear) => {
      const newYear = await create(year);
      dispatch({
        type: ADD_YEAR,
        payload: newYear
      });
    }
  };
  
  export const updateYear = (year: Year) => {
    return async (dispatch: DispatchUpdateYear) => {
      const newYear = await update(year.id, year);
      dispatch({
        type: UPDATE_YEAR,
        payload: newYear
      });
    }
  };
    
  export const removeYear = (id: string) => {
    return async (dispatch: DispatchRemoveYear) => {
      await remove(id);
      dispatch({
        type: REMOVE_YEAR,
        payload: id
      });
    }
  };
  