import { Format } from '../../../types/book';
import { SET_SELECTED_FORMAT, CLEAR_SELECTED_FORMAT, ActionTypes } from './types';

export const setSelectedFormat = (format: Format) => {
    const action: ActionTypes = {
        type: SET_SELECTED_FORMAT,
        payload: format
    };
    
    return action;  
}

export const clearSelectedFormat = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_FORMAT
    };
    
    return action;  
}

