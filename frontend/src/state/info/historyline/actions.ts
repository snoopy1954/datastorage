import { Historyline } from '../../../../../backend/src/types/logging';
import { SET_SELECTED_HISTORYLINE, CLEAR_SELECTED_HISTORYLINE, ActionTypes } from './types';

export const setHistoryline = (historyline: Historyline) => {
    const action: ActionTypes = {
        type: SET_SELECTED_HISTORYLINE,
        payload: historyline
    };
    
    return action;  
}

export const clearHistoryline = () => {
    const action: ActionTypes = {
        type: CLEAR_SELECTED_HISTORYLINE
    };
    
    return action;  
}

