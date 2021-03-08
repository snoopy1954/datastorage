import { Historyline, HistorylineNoID } from '../../../../../backend/src/types/logging';
import { SET_HISTORYLINES, 
  ADD_HISTORYLINE, 
  UPDATE_HISTORYLINE,
  REMOVE_HISTORYLINE,
  DispatchSetHistorylines, 
  DispatchAddHistoryline,
  DispatchUpdateHistoryline,
  DispatchRemoveHistoryline 
} from './types';

import { create, getAll, update, remove } from "../../../services/logging/historylines";


export const initializeHistorylines = () => {
  return async (dispatch: DispatchSetHistorylines) => {
    const historylines = await getAll(); 
    dispatch({
      type: SET_HISTORYLINES,
      payload: historylines,
    });
  }
}

export const addHistoryline = (historyline: HistorylineNoID) => {
  return async (dispatch: DispatchAddHistoryline) => {
    const newHistoryline = await create(historyline);
    dispatch({
      type: ADD_HISTORYLINE,
      payload: newHistoryline
    });
  }
};

export const updateHistoryline = (historyline: Historyline) => {
  return async (dispatch: DispatchUpdateHistoryline) => {
    const newHistoryline = await update(historyline.id, historyline);
    dispatch({
      type: UPDATE_HISTORYLINE,
      payload: newHistoryline
    });
  }
};
  
export const removeHistoryline = (id: string) => {
  return async (dispatch: DispatchRemoveHistoryline) => {
    await remove(id);
    dispatch({
      type: REMOVE_HISTORYLINE,
      payload: id
    });
  }
};


