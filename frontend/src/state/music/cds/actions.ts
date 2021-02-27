import { Cd, CdNoID } from '../../../../../backend/src/types/music';
import { 
    SET_CDS, 
    ADD_CD,
    UPDATE_CD,
    REMOVE_CD,
    EXCHANGE_CDS,
    DispatchSetCds,
    DispatchAddCd,
    DispatchUpdateCd,
    DispatchRemoveCd
} from './types';

import { create, update, remove, getAll } from "../../../services/music/cd";


export const initializeCds = () => {
  return async (dispatch: DispatchSetCds) => {
    const cds = await getAll();
    dispatch({
      type: SET_CDS,
      payload: cds,
    });
  }
};

export const addCd = (cd: CdNoID) => {
  return async (dispatch: DispatchAddCd) => {
    const newCd = await create(cd);
    dispatch({
      type: ADD_CD,
      payload: newCd
    });
  }
};

export const updateCd = (cd: Cd) => {
  return async (dispatch: DispatchUpdateCd) => {
    const newCd = await update(cd.id, cd);
    dispatch({
      type: UPDATE_CD,
      payload: newCd
    });
  }
};
  
export const removeCd = (id: string) => {
  return async (dispatch: DispatchRemoveCd) => {
    await remove(id);
    dispatch({
      type: REMOVE_CD,
      payload: id
    });
  }
};

export const exchangeCds = (cds: Cd[]) => {
  const action = 
    {
      type: EXCHANGE_CDS,
      payload: cds,
    }
        
    return action;  
};

