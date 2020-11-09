import { INITIALIZE_CANDIDATES, SET_CANDIDATES, SET_CANDIDATE, CLEAR_CANDIDATE, ActionTypes } from './types';

import { initializeCandidates } from '../../../utils/sudoku';

const initialState: boolean[] = initializeCandidates();

export const candidatesReducer = (state = initialState, action: ActionTypes): boolean[] => {
    switch (action.type) {
        case INITIALIZE_CANDIDATES:
            return initialState;
        case SET_CANDIDATES:
            return action.payload
        case SET_CANDIDATE:
            return {
                ...state,
                [action.payload]: true
                }
        case CLEAR_CANDIDATE:
            return {
                ...state,
                [action.payload]: false
            }
        default:
            return state
    }
};