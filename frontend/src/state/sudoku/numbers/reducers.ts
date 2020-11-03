import { INITIALIZE_NUMBERS, SET_NUMBER, CLEAR_NUMBER, ActionTypes } from './types';

const initialState: number[] = [];

export const numbersReducer = (state = initialState, action: ActionTypes): number[] => {
    switch (action.type) {
        case INITIALIZE_NUMBERS:
            return initialState;
        case SET_NUMBER:
            return {
                ...state,
                [action.payload.index]: action.payload.value
            }
        case CLEAR_NUMBER:
            return {
                ...state,
                [action.payload]: 0
            }
        default:
            return state
    }
};