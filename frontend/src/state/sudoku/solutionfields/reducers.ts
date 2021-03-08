import { Field } from '../../../types/sudoku';

import { INITIALIZE_SOLUTIONFIELDS, SET_SOLUTIONFIELD, ActionTypes } from './types';

import { initializeValues } from '../../../utils/sudoku/sudoku';

const initialState: Field[] = initializeValues();

export const solutionfieldsReducer = (state = initialState, action: ActionTypes): Field[] => {
    switch (action.type) {
        case INITIALIZE_SOLUTIONFIELDS:
            return initialState;
        case SET_SOLUTIONFIELD:
            return {
                ...state,
                [action.payload.fieldnr]: action.payload
            }
        default:
            return state
    }
};