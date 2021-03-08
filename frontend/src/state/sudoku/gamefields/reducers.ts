import { Field } from '../../../types/sudoku';

import { INITIALIZE_GAMEFIELDS, SET_GAMEFIELD, CLEAR_GAMEFIELD, ActionTypes } from './types';

import { initializeValues } from '../../../utils/sudoku/sudoku';

const initialState: Field[] = initializeValues();

export const gamefieldsReducer = (state = initialState, action: ActionTypes): Field[] => {
    switch (action.type) {
        case INITIALIZE_GAMEFIELDS:
            return initializeValues();
        case SET_GAMEFIELD:
            return {
                ...state,
                [action.payload.fieldnr]: action.payload
            }
        case CLEAR_GAMEFIELD:
            return {
                ...(Object.values(state)).filter((fieldvalue) => (fieldvalue.fieldnr !== action.payload))
            }
        default:
            return state
    }
};