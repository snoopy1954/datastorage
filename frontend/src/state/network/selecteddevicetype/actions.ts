import { Devicetype } from '../../../../../backend/src/types/network';
import { SET_SELECTED_DEVICETYPE, CLEAR_SELECTED_DEVICETYPE, ActionTypes } from './types';

export const setSelectedDevicetype = (devicetype: Devicetype) => {
    const action: ActionTypes = {
        type: SET_SELECTED_DEVICETYPE,
        payload: devicetype
    };
    
    return action;  
}

export const clearSelectedDevicetype = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_DEVICETYPE
    };
    
    return action;  
}

