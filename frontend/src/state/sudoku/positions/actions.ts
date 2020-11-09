import { INITIALIZE_POSITIONS, ActionTypes } from './types';

export const initializePositions = () => {
    const action: ActionTypes = {
        type: INITIALIZE_POSITIONS
    };
    
    return action;  
}

