import { INITIALIZE_FLAGS, SET_FLAG, CLEAR_FLAG, TOGGLE_FLAG, ActionTypes } from './types';

const initialState: boolean[] = [false, false, false, false, false, false];

export const flagsReducer = (state = initialState, action: ActionTypes): boolean[] => {
    switch (action.type) {
        case INITIALIZE_FLAGS:
            return initialState;
        case SET_FLAG:
            return {
                ...state,
                [action.payload]: true
            }
        case CLEAR_FLAG:
            return {
                ...state,
                [action.payload]: false
            }
        case TOGGLE_FLAG:
            return {
                ...state,
                [action.payload]: !state[action.payload]
            }
        default:
            return state
    }
};