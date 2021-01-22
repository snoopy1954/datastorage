import { Info } from '../../../../../backend/src/types/logging';
import { SET_COMMENT, UPDATE_COMMENT, DispatchSetInfo, DispatchUpdateInfo } from './types';

import { getAll, update } from "../../../services/logging/infos";


export const initializeInfos = () => {
  return async (dispatch: DispatchSetInfo) => {
    const infos = await getAll();
    const info = infos[0];
    dispatch({
      type: SET_COMMENT,
      payload: info,
    });
  }
};

export const updateInfo = (info: Info) => {
  return async (dispatch: DispatchUpdateInfo) => {
    const newInfo = await update(info.id, info);
    dispatch({
      type: UPDATE_COMMENT,
      payload: newInfo
    });
  }
};
