import { Os, OsNoID } from '../../../../../backend/src/types/network';
import { 
    SET_OS_LIST, 
    ADD_OS,
    UPDATE_OS,
    REMOVE_OS,
    DispatchSetOsList,
    DispatchAddOs,
    DispatchUpdateOs,
    DispatchRemoveOs
} from './types';

import { create, update, remove, getAll } from "../../../services/network/oss";

import { sortOsList } from "../../../utils/network/os";


export const initializeOss = () => {
  return async (dispatch: DispatchSetOsList) => {
    const oss = sortOsList(await getAll());
    dispatch({
      type: SET_OS_LIST,
      payload: oss,
    });
  }
}

export const addOs = (os: OsNoID) => {
  return async (dispatch: DispatchAddOs) => {
    const newOs = await create(os);
    dispatch({
      type: ADD_OS,
      payload: newOs
    });
  }
};

export const updateOs = (os: Os) => {
  return async (dispatch: DispatchUpdateOs) => {
    const newOs = await update(os.id, os);
    dispatch({
      type: UPDATE_OS,
      payload: newOs
    });
  }
};
  
export const removeOs = (id: string) => {
  return async (dispatch: DispatchRemoveOs) => {
    await remove(id);
    dispatch({
      type: REMOVE_OS,
      payload: id
    });
  }
};
