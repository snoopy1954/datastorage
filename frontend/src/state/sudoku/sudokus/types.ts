import { Sudoku } from '../../../../../backend/src/types/sudoku';

export const SET_SUDOKUS = 'SET_SUDOKUS';
export const ADD_SUDOKU  = 'ADD_SUDOKU';
export const UPDATE_SUDOKU = 'UPDATE_SUDOKU';
export const REMOVE_SUDOKU = 'REMOVE_SUDOKU';

interface SetSudokusAction {
    type: typeof SET_SUDOKUS;
    payload: Sudoku[];
}

interface AddSudokuAction {
    type: typeof ADD_SUDOKU;
    payload: Sudoku;
}

interface UpdateSudokuAction {
    type: typeof UPDATE_SUDOKU;
    payload: Sudoku;
}

interface RemoveSudokuAction {
    type: typeof REMOVE_SUDOKU;
    payload: string;
}

export type DispatchSetSudokus = (arg: SetSudokusAction) => (SetSudokusAction);
export type DispatchAddSudoku = (arg: AddSudokuAction) => (AddSudokuAction);
export type DispatchUpdateSudoku = (arg: UpdateSudokuAction) => (UpdateSudokuAction);
export type DispatchRemoveSudoku = (arg: RemoveSudokuAction) => (RemoveSudokuAction);
    
export type ActionTypes = SetSudokusAction | AddSudokuAction | UpdateSudokuAction | RemoveSudokuAction;
    