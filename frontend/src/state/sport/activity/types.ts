import { Activity } from '../../../../../backend/src/types/sport';

export const SET_SELECTED_ACTIVITY = 'SET_SELECTED_ACTIVITY';
export const CLEAR_SELECTED_ACTIVITY = 'CLEAR_SELECTED_ACTIVITY';

interface SetSelectedActivityAction {
    type: typeof SET_SELECTED_ACTIVITY;
    payload: Activity;
}

interface ClearSelectedActivityAction {
    type: typeof CLEAR_SELECTED_ACTIVITY;
}

export type ActionTypes = SetSelectedActivityAction | ClearSelectedActivityAction;