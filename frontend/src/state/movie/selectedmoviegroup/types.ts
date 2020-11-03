import { Moviegroup } from '../../../../../backend/src/types/movie';

export const SET_SELECTED_MOVIEGROUP = 'SET_SELECTED_MOVIEGROUP';
export const CLEAR_SELECTED_MOVIEGROUP = 'CLEAR_SELECTED_MOVIEGROUP';

interface SetSelectedMoviegroupAction {
    type: typeof SET_SELECTED_MOVIEGROUP;
    payload: Moviegroup;
}

interface ClearSelectedMoviegroupAction {
    type: typeof CLEAR_SELECTED_MOVIEGROUP;
}

export type ActionTypes = SetSelectedMoviegroupAction | ClearSelectedMoviegroupAction;