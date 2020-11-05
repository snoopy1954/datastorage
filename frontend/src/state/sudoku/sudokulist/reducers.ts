import { Sudoku } from '../../../../../backend/src/types/sudoku';
import { SET_SUDOKU_LIST, ADD_SUDOKU, UPDATE_SUDOKU, REMOVE_SUDOKU, ActionTypes } from './types';

const initialState: Sudoku[] = [];

export const sudokulistReducer = (state = initialState, action: ActionTypes): Sudoku[] => {
    switch (action.type) {
        case SET_SUDOKU_LIST:
            return {
                ...state,
                ...action.payload.reduce(
                    (memo, sudoku) => ({ ...memo, [sudoku.id]: sudoku }),
                    {}
                ),
            }
        case ADD_SUDOKU:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case UPDATE_SUDOKU:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case REMOVE_SUDOKU: 
            return {
                ...(Object.values(state)).filter((sudoku) => (sudoku.id !== action.payload))
            }
        default:
            return state
    }
}

