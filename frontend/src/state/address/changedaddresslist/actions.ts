import { Address } from '../../../../../backend/src/types/address';
import { ADD_CHANGED_ADDRESS, CLEAR_CHANGED_ADDRESS, ActionTypes } from './types';


export const addChangedAddress = (address: Address) => {
  const action: ActionTypes = 
    {
      type: ADD_CHANGED_ADDRESS,
      payload: address
    }
        
    return action;  
}

export const clearChangedAddress = () => {
  const action: ActionTypes = 
    {
      type: CLEAR_CHANGED_ADDRESS
    }
        
    return action;  
}

