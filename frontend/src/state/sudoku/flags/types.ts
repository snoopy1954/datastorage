import { Flagtype } from '../../../types/sudoku';

export const INITIALIZE_FLAGS = 'INITIALIZE_FLAGS';
export const SET_FLAG = 'SET_FLAG';
export const CLEAR_FLAG= 'CLEAR_FLAG';
export const TOGGLE_FLAG = 'TOGGLE_FLAG';

interface InitializeFlagsAction {
    type: typeof INITIALIZE_FLAGS;
}

interface SetFlagAction {
    type: typeof SET_FLAG;
    payload: Flagtype;
}

interface ClearFlagAction {
    type: typeof CLEAR_FLAG;
    payload: Flagtype;
}

interface ToggleFlagAction {
    type: typeof TOGGLE_FLAG;
    payload: Flagtype;
}

export type ActionTypes = InitializeFlagsAction | SetFlagAction | ClearFlagAction | ToggleFlagAction;