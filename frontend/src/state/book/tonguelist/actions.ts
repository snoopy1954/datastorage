import { Tongue, TongueNoID } from '../../../types/book';
import { 
    SET_TONGUE_LIST, 
    ADD_TONGUE,
    UPDATE_TONGUE,
    REMOVE_TONGUE,
    DispatchSetTongueList,
    DispatchAddTongue,
    DispatchUpdateTongue,
    DispatchRemoveTongue
} from './types';

import { create, update, remove, getAll } from "../../../services/book/tongues";


export const initializeTongues = () => {
  return async (dispatch: DispatchSetTongueList) => {
    const tongues = await getAll();
    dispatch({
      type: SET_TONGUE_LIST,
      payload: tongues,
    });
  }
}

export const addTongue = (tongue: TongueNoID) => {
  return async (dispatch: DispatchAddTongue) => {
    const newTongue = await create(tongue);
    dispatch({
      type: ADD_TONGUE,
      payload: newTongue
    });
  }
};

export const updateTongue = (tongue: Tongue) => {
  return async (dispatch: DispatchUpdateTongue) => {
    const newTongue = await update(tongue.id, tongue);
    dispatch({
      type: UPDATE_TONGUE,
      payload: newTongue
    });
  }
};
  
export const removeTongue = (id: string) => {
  return async (dispatch: DispatchRemoveTongue) => {
    await remove(id);
    dispatch({
      type: REMOVE_TONGUE,
      payload: id
    });
  }
};
