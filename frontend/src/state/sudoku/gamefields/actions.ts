import { Field } from '../../../types/sudoku';

import { INITIALIZE_GAMEFIELDS, SET_GAMEFIELD, CLEAR_GAMEFIELD, ActionTypes } from './types';

export const initializeGamefields = () => {
    const action: ActionTypes = {
        type: INITIALIZE_GAMEFIELDS
    };
    
    return action;  
}

export const setGamefield = (gamefield: Field) => {
    const action: ActionTypes = {
        type: SET_GAMEFIELD,
        payload: gamefield
    };
    
    return action;  
}

export const clearGamefield = (index: number) => {
    const action: ActionTypes = {
        type: CLEAR_GAMEFIELD,
        payload: index
    };
    
    return action;  
}

