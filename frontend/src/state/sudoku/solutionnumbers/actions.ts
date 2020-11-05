import { FieldValue } from '../../../types/sudoku';

import { INITIALIZE_SOLUTIONNUMBERS, SET_SOLUTIONNUMBER, ActionTypes } from './types';

export const initializeSolutionnumbers = () => {
    const action: ActionTypes = {
        type: INITIALIZE_SOLUTIONNUMBERS
    };
    
    return action;  
}

export const setSolutionnumber = (solutionnumber: FieldValue) => {
    const action: ActionTypes = {
        type: SET_SOLUTIONNUMBER,
        payload: solutionnumber
    };
    
    return action;  
}
