import { Tongue } from '../../../types/book';
import { SET_SELECTED_TONGUE, CLEAR_SELECTED_TONGUE, ActionTypes } from './types';

export const setSelectedTongue = (tongue: Tongue) => {
    const action: ActionTypes = {
        type: SET_SELECTED_TONGUE,
        payload: tongue
    };
    
    return action;  
}

export const clearSelectedTongue = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_TONGUE
    };
    
    return action;  
}

