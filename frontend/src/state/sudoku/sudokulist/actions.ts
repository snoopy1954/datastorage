import { Sudoku, SudokuNoID } from '../../../../../backend/src/types/sudoku';
import { 
    SET_SUDOKU_LIST, 
    ADD_SUDOKU,
    UPDATE_SUDOKU,
    REMOVE_SUDOKU,
    DispatchSetSudokuList,
    DispatchAddSudoku,
    DispatchUpdateSudoku,
    DispatchRemoveSudoku
} from './types';

import { create, update, remove, getAll } from "../../../services/sudoku/sudokus";


export const initializeSudokus = async () => {
  return async (dispatch: DispatchSetSudokuList) => {
    const sudokus = await getAll();
    dispatch({
      type: SET_SUDOKU_LIST,
      payload: sudokus,
    });
  }
}

export const addSudoku = (sudoku: SudokuNoID) => {
  return async (dispatch: DispatchAddSudoku) => {
    const newSudoku = await create(sudoku);
    dispatch({
      type: ADD_SUDOKU,
      payload: newSudoku
    });
  }
};

export const updateSudoku = (sudoku: Sudoku) => {
  return async (dispatch: DispatchUpdateSudoku) => {
    const newSudoku = await update(sudoku.id, sudoku);
    dispatch({
      type: UPDATE_SUDOKU,
      payload: newSudoku
    });
  }
};
  
export const removeSudoku = (id: string) => {
  return async (dispatch: DispatchRemoveSudoku) => {
    await remove(id);
    dispatch({
      type: REMOVE_SUDOKU,
      payload: id
    });
  }
};
