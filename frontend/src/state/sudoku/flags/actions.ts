import { Flagtype } from '../../../types/sudoku';

import { INITIALIZE_FLAGS, SET_FLAG, CLEAR_FLAG, ActionTypes } from './types';

export const initializeFlags = () => {
    const action: ActionTypes = {
        type: INITIALIZE_FLAGS
    };
    
    return action;  
}

export const setFlag = (flagtype: Flagtype) => {
    const action: ActionTypes = {
        type: SET_FLAG,
        payload: flagtype
    };
    
    return action;  
}

export const clearFlag = (flagtype: Flagtype) => {
    const action: ActionTypes = {
        type: CLEAR_FLAG,
        payload: flagtype
    };
    
    return action;  
}

