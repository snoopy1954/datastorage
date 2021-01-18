import { HistorylineNoID } from '../../../../../backend/src/types/logging';
import { SET_HISTORYLINES, ADD_HISTORYLINE, DispatchSetHistorylines, DispatchAddHistoryline } from './types';

import { create, getAll } from "../../../services/logging/historylines";

import { sortHistorylines } from '../../../utils/info/historyline';


export const initializeHistorylines = () => {
  return async (dispatch: DispatchSetHistorylines) => {
    const historylines = sortHistorylines(await getAll());
//    const historylines = await getAll();
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

