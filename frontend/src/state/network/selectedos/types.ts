import { Os } from '../../../../../backend/src/types/network';

export const SET_SELECTED_OS = 'SET_SELECTED_OS';
export const CLEAR_SELECTED_OS = 'CLEAR_SELECTED_OS';

interface SetSelectedOsAction {
    type: typeof SET_SELECTED_OS;
    payload: Os;
}

interface ClearSelectedOsAction {
    type: typeof CLEAR_SELECTED_OS;
}

export type ActionTypes = SetSelectedOsAction | ClearSelectedOsAction;