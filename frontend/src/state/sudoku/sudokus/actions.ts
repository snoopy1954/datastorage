import { Sudoku, SudokuNoID } from '../../../../../backend/src/types/sudoku';
import { 
    SET_SUDOKUS, 
    ADD_SUDOKU,
    UPDATE_SUDOKU,
    REMOVE_SUDOKU,
    DispatchSetSudokus,
    DispatchAddSudoku,
    DispatchUpdateSudoku,
    DispatchRemoveSudoku
} from './types';

import { create, update, remove, getAll } from "../../../services/sudoku/sudokus";


export const initializeSudokus = async () => {
  return async (dispatch: DispatchSetSudokus) => {
    const sudokus = await getAll();
    dispatch({
      type: SET_SUDOKUS,
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
