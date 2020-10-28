import { Device } from '../../../../../backend/src/types/network';
import { SET_SELECTED_DEVICE, CLEAR_SELECTED_DEVICE, ActionTypes } from './types';

export const setSelectedDevice = (device: Device) => {
    const action: ActionTypes = {
        type: SET_SELECTED_DEVICE,
        payload: device
    };
    
    return action;  
}

export const clearSelectedDevice = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_DEVICE
    };
    
    return action;  
}

