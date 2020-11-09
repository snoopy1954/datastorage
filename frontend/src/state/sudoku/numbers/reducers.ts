import { FieldValue } from '../../../types/sudoku';

import { INITIALIZE_NUMBERS, SET_NUMBER, CLEAR_NUMBER, ActionTypes } from './types';

import { initializeValues } from '../../../utils/sudoku';

const initialState: FieldValue[] = initializeValues();

export const numbersReducer = (state = initialState, action: ActionTypes): FieldValue[] => {
    switch (action.type) {
        case INITIALIZE_NUMBERS:
            return initializeValues();
        case SET_NUMBER:
            return {
                ...state,
                [action.payload.fieldnr]: action.payload
            }
        case CLEAR_NUMBER:
            return {
                ...(Object.values(state)).filter((fieldvalue) => (fieldvalue.fieldnr !== action.payload))
            }
        default:
            return state
    }
};