import { Format, FormatNoID } from '../../../../../backend/src/types/basic';

import { SET_FORMATS, ADD_FORMAT, UPDATE_FORMAT, REMOVE_FORMAT } from './types';


export const initializeFormats = (formats: Format[]) => {
  const action = {
    type: SET_FORMATS,
    payload: formats,
  };

  return action;  
};

export const addFormat = (format: FormatNoID) => {
  const action = {
    type: ADD_FORMAT,
    payload: format
  };

  return action;  
};

export const updateFormat = (format: Format) => {
  const action = {
    type: UPDATE_FORMAT,
    payload: format
  };

  return action;  
};
  
export const removeFormat = (id: string) => {
  const action = {
    type: REMOVE_FORMAT,
    payload: id
  };

  return action;  
};
