import { FieldValue } from '../../../types/sudoku';

import { INITIALIZE_SOLUTIONNUMBERS, SET_SOLUTIONNUMBER, ActionTypes } from './types';

import { initializeValues } from '../../../utils/sudoku';

const initialState: FieldValue[] = initializeValues();

export const solutionnumbersReducer = (state = initialState, action: ActionTypes): FieldValue[] => {
    switch (action.type) {
        case INITIALIZE_SOLUTIONNUMBERS:
            return initialState;
        case SET_SOLUTIONNUMBER:
            return {
                ...state,
                [action.payload.fieldnr]: action.payload
            }
        default:
            return state
    }
};