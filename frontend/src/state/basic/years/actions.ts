import { Year, YearNoID } from '../../../../../backend/src/types/basic';

import { SET_YEARS, ADD_YEAR, UPDATE_YEAR, REMOVE_YEAR } from './types';


export const initializeYears = (years: Year[]) => {
  const action = {
    type: SET_YEARS,
    payload: years,
  };

  return action;  
};

export const addYear = (year: YearNoID) => {
  const action = {
    type: ADD_YEAR,
    payload: year
  };

  return action;  
};

export const updateYear = (year: Year) => {
  const action = {
    type: UPDATE_YEAR,
    payload: year
  };

  return action;  
};
  
export const removeYear = (id: string) => {
  const action = {
    type: REMOVE_YEAR,
    payload: id
  };

  return action;  
};
