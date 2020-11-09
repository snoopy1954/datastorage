import { INITIALIZE_SEQUENCE, PUSH_SEQUENCE, POP_SEQUENCE, ActionTypes } from './types';

const initialState: number[] = [];

export const sequenceReducer = (state = initialState, action: ActionTypes): number[] => {
    switch (action.type) {
        case INITIALIZE_SEQUENCE:
            return initialState;
        case PUSH_SEQUENCE:
            state.push(action.payload);
            return state                    
        case POP_SEQUENCE:
            state.pop();
            return state                    
        default:
            return state
    }
};