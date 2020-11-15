import { Field } from '../../../types/sudoku';

export const INITIALIZE_SOLUTIONFIELDS = 'INITIALIZE_SOLUTIONFIELDS';
export const SET_SOLUTIONFIELD = 'SET_SOLUTIONFIELD';

interface InitializeSolutionfieldsAction {
    type: typeof INITIALIZE_SOLUTIONFIELDS;
}

interface SetSolutionfieldAction {
    type: typeof SET_SOLUTIONFIELD;
    payload: Field;
}

export type ActionTypes = InitializeSolutionfieldsAction | SetSolutionfieldAction;