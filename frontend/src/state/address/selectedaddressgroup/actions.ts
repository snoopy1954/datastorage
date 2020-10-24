import { Addressgroup } from '../../../../../backend/src/types/addressTypes';
import { SET_SELECTED_ADDRESSGROUP, CLEAR_SELECTED_ADDRESSGROUP, ActionTypes } from './types';

export const setSelectedAddressgroup = (addressgroup: Addressgroup) => {
    const action: ActionTypes = {
        type: SET_SELECTED_ADDRESSGROUP,
        payload: addressgroup
    };
    
    return action;  
}

export const clearSelectedAddressgroup = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_ADDRESSGROUP
    };
    
    return action;  
}

