import { SET_SUBGROUPS, CLEAR_SUBGROUPS, ActionTypes } from './types';

export const setSelectedSubgroups = (subgroups: string[]) => {
    const action: ActionTypes = {
        type: SET_SUBGROUPS,
        payload: subgroups
    };
    
    return action;  
}

export const clearSelectedSubgroups = () => {
    const action: ActionTypes = {
        type: CLEAR_SUBGROUPS
    };
    
    return action;  
}

