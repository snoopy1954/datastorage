import { FieldValue } from '../../../types/sudoku';

export const INITIALIZE_SOLUTIONNUMBERS = 'INITIALIZE_SOLUTIONNUMBERS';
export const SET_SOLUTIONNUMBER = 'SET_SOLUTIONNUMBER';

interface InitializeSolutionnumbersAction {
    type: typeof INITIALIZE_SOLUTIONNUMBERS;
}

interface SetSolutionnumberAction {
    type: typeof SET_SOLUTIONNUMBER;
    payload: FieldValue;
}

export type ActionTypes = InitializeSolutionnumbersAction | SetSolutionnumberAction;