import { Biller } from '../../../../../backend/src/types/axa';
import { ADD_CHANGED_BILLER, CLEAR_CHANGED_BILLER, ActionTypes } from './types';


export const addChangedBiller = (biller: Biller) => {
  const action: ActionTypes = 
    {
      type: ADD_CHANGED_BILLER,
      payload: biller
    }
        
    return action;  
}

export const clearChangedBiller = () => {
  const action: ActionTypes = 
    {
      type: CLEAR_CHANGED_BILLER
    }
        
    return action;  
}

