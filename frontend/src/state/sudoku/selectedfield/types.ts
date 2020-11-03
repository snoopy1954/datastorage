export const SET_SELECTED_FIELD = 'SET_SELECTED_FIELD';
export const CLEAR_SELECTED_FIELD = 'CLEAR_SELECTED_FIELD';

interface SetSelectedFieldAction {
    type: typeof SET_SELECTED_FIELD;
    payload: number;
}

interface ClearSelectedFieldAction {
    type: typeof CLEAR_SELECTED_FIELD;
}

export type ActionTypes = SetSelectedFieldAction | ClearSelectedFieldAction;