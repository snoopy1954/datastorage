import { Os } from '../../../../../backend/src/types/network';
import { SET_SELECTED_OS, CLEAR_SELECTED_OS, ActionTypes } from './types';

export const setSelectedOs = (os: Os) => {
    const action: ActionTypes = {
        type: SET_SELECTED_OS,
        payload: os
    };
    
    return action;  
}

export const clearSelectedOs = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_OS
    };
    
    return action;  
}

