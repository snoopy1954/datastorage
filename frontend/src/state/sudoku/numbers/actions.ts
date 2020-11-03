import { INITIALIZE_NUMBERS, SET_NUMBER, CLEAR_NUMBER, ActionTypes } from './types';

export const initializeNumbers = () => {
    const action: ActionTypes = {
        type: INITIALIZE_NUMBERS
    };
    
    return action;  
}

export const setNumber = (index: number, value: number) => {
    const action: ActionTypes = {
        type: SET_NUMBER,
        payload: {
            index: index,
            value: value
        }
    };
    
    return action;  
}

export const clearNumber = (index: number) => {
    const action: ActionTypes = {
        type: CLEAR_NUMBER,
        payload: index
    };
    
    return action;  
}

