import { Sudoku } from '../../../../../backend/src/types/sudoku';

export const SET_SUDOKU_LIST = 'SET_SUDOKU_LIST';
export const ADD_SUDOKU  = 'ADD_SUDOKU';
export const UPDATE_SUDOKU = 'UPDATE_SUDOKU';
export const REMOVE_SUDOKU = 'REMOVE_SUDOKU';

interface SetSudokuListAction {
    type: typeof SET_SUDOKU_LIST;
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

export type DispatchSetSudokuList = (arg: SetSudokuListAction) => (SetSudokuListAction);
export type DispatchAddSudoku = (arg: AddSudokuAction) => (AddSudokuAction);
export type DispatchUpdateSudoku = (arg: UpdateSudokuAction) => (UpdateSudokuAction);
export type DispatchRemoveSudoku = (arg: RemoveSudokuAction) => (RemoveSudokuAction);
    
export type ActionTypes = SetSudokuListAction | AddSudokuAction | UpdateSudokuAction | RemoveSudokuAction;
    