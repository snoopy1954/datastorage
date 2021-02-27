import { Cd } from '../../../../../backend/src/types/music';

export const SET_SELECTED_CD = 'SET_SELECTED_CD';
export const CLEAR_SELECTED_CD = 'CLEAR_SELECTED_CD';

interface SetSelectedCdAction {
    type: typeof SET_SELECTED_CD;
    payload: Cd;
}

interface ClearSelectedCdAction {
    type: typeof CLEAR_SELECTED_CD;
}

export type ActionTypes = SetSelectedCdAction | ClearSelectedCdAction;