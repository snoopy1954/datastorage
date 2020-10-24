import { Format, FormatNoID } from '../../../types/book';
import { 
    SET_FORMAT_LIST, 
    ADD_FORMAT,
    UPDATE_FORMAT,
    REMOVE_FORMAT,
    DispatchSetFormatList,
    DispatchAddFormat,
    DispatchUpdateFormat,
    DispatchRemoveFormat
} from './types';

import { create, update, remove, getAll } from "../../../services/book/formats";


export const initializeFormats = () => {
  return async (dispatch: DispatchSetFormatList) => {
    const formats = await getAll();
    dispatch({
      type: SET_FORMAT_LIST,
      payload: formats,
    });
  }
}

export const addFormat = (format: FormatNoID) => {
  return async (dispatch: DispatchAddFormat) => {
    const newFormat = await create(format);
    dispatch({
      type: ADD_FORMAT,
      payload: newFormat
    });
  }
};

export const updateFormat = (format: Format) => {
  return async (dispatch: DispatchUpdateFormat) => {
    const newFormat = await update(format.id, format);
    dispatch({
      type: UPDATE_FORMAT,
      payload: newFormat
    });
  }
};
  
export const removeFormat = (id: string) => {
  return async (dispatch: DispatchRemoveFormat) => {
    await remove(id);
    dispatch({
      type: REMOVE_FORMAT,
      payload: id
    });
  }
};
