import { Historyline } from '../../../../../backend/src/types/logging';

export const SET_SELECTED_HISTORYLINE = 'SET_SELECTED_HISTORYLINE';
export const CLEAR_SELECTED_HISTORYLINE = 'CLEAR_SELECTED_HISTORYLINE';

interface SetSelectedHistorylineAction {
    type: typeof SET_SELECTED_HISTORYLINE;
    payload: Historyline;
}

interface ClearSelectedHistorylineAction {
    type: typeof CLEAR_SELECTED_HISTORYLINE;
}

export type ActionTypes = SetSelectedHistorylineAction | ClearSelectedHistorylineAction;