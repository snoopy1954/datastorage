import { Biller, BillerNoID } from '../../../../../backend/src/types/axa';
import { 
    SET_BILLER_LIST, 
    ADD_BILLER,
    UPDATE_BILLER,
    REMOVE_BILLER,
    EXCHANGE_BILLERS,
    DispatchSetBillerList,
    DispatchAddBiller,
    DispatchUpdateBiller,
    DispatchRemoveBiller
} from './types';

import { create, update, remove, getAll } from "../../../services/axa/billers";

import { sortBillerList } from '../../../utils/axa/biller';


export const initializeBillers = () => {
  return async (dispatch: DispatchSetBillerList) => {
    const billers = sortBillerList(await getAll());
    dispatch({
      type: SET_BILLER_LIST,
      payload: billers,
    });
  }
}

export const addBiller = (biller: BillerNoID) => {
  return async (dispatch: DispatchAddBiller) => {
    const newBiller = await create(biller);
    dispatch({
      type: ADD_BILLER,
      payload: newBiller
    });
  }
};

export const updateBiller = (biller: Biller) => {
  return async (dispatch: DispatchUpdateBiller) => {
    const newBiller = await update(biller.id, biller);
    dispatch({
      type: UPDATE_BILLER,
      payload: newBiller
    });
  }
};
  
export const removeBiller = (id: string) => {
  return async (dispatch: DispatchRemoveBiller) => {
    await remove(id);
    dispatch({
      type: REMOVE_BILLER,
      payload: id
    });
  }
};

export const exchangeBillers = (billers: Biller[]) => {
  const action = 
    {
      type: EXCHANGE_BILLERS,
      payload: billers,
    }
        
    return action;  
};

