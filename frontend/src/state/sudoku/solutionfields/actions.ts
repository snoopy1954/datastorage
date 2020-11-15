import { Field } from '../../../types/sudoku';

import { INITIALIZE_SOLUTIONFIELDS, SET_SOLUTIONFIELD, ActionTypes } from './types';

export const initializeSolutionfields = () => {
    const action: ActionTypes = {
        type: INITIALIZE_SOLUTIONFIELDS
    };
    
    return action;  
}

export const setSolutionfield = (solutionfield: Field) => {
    const action: ActionTypes = {
        type: SET_SOLUTIONFIELD,
        payload: solutionfield
    };
    
    return action;  
}
