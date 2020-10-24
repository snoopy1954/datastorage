import { Address } from '../../../../../backend/src/types/addressTypes';
import { SET_SELECTED_ADDRESS, CLEAR_SELECTED_ADDRESS, ActionTypes } from './types';

export const setSelectedAddress = (address: Address) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ADDRESS,
        payload: address
    };
    
    return action;  
}

export const clearSelectedAddress = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ADDRESS
    };
    
    return action;  
}

