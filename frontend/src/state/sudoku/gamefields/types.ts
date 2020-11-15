import { Field } from '../../../types/sudoku';

export const INITIALIZE_GAMEFIELDS = 'INITIALIZE_GAMEFIELDS';
export const SET_GAMEFIELD = 'SET_GAMEFIELD';
export const CLEAR_GAMEFIELD= 'CLEAR_GAMEFIELD';

interface InitializeGamefieldsAction {
    type: typeof INITIALIZE_GAMEFIELDS;
}

interface SetGamefieldAction {
    type: typeof SET_GAMEFIELD;
    payload: Field;
}

interface ClearGamefieldAction {
    type: typeof CLEAR_GAMEFIELD;
    payload: number;
}

export type ActionTypes = InitializeGamefieldsAction | SetGamefieldAction | ClearGamefieldAction;