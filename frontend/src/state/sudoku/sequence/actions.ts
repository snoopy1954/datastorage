import { INITIALIZE_SEQUENCE, PUSH_SEQUENCE, POP_SEQUENCE, ActionTypes } from './types';

export const initializeSequence = () => {
    const action: ActionTypes = {
        type: INITIALIZE_SEQUENCE
    };
    
    return action;  
}

export const pushSequence = (sequence: number) => {
    const action: ActionTypes = {
        type: PUSH_SEQUENCE,
        payload: sequence
    };
    
    return action;  
}

export const popSequence = () => {
    const action: ActionTypes = {
        type: POP_SEQUENCE
    };
    
    return action;  
}

