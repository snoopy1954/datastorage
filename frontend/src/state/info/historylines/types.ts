import { Historyline } from '../../../../../backend/src/types/logging';

export const SET_HISTORYLINES = 'SET_HISTORYLINES';
export const ADD_HISTORYLINE  = 'ADD_HISTORYLINE';
export const UPDATE_HISTORYLINE = 'UPDATE_HISTORYLINE';
export const REMOVE_HISTORYLINE = 'REMOVE_HISTORYLINE';

interface SetHistorylinesAction {
    type: typeof SET_HISTORYLINES;
    payload: Historyline[];
}

interface AddHistorylineAction {
    type: typeof ADD_HISTORYLINE;
    payload: Historyline;
}

interface UpdateHistorylineAction {
    type: typeof UPDATE_HISTORYLINE;
    payload: Historyline;
}

interface RemoveHistorylineAction {
    type: typeof REMOVE_HISTORYLINE;
    payload: string;
}

export type DispatchSetHistorylines = (arg: SetHistorylinesAction) => (SetHistorylinesAction);
export type DispatchAddHistoryline = (arg: AddHistorylineAction) => (AddHistorylineAction);
export type DispatchUpdateHistoryline = (arg: UpdateHistorylineAction) => (UpdateHistorylineAction);
export type DispatchRemoveHistoryline = (arg: RemoveHistorylineAction) => (RemoveHistorylineAction);

export type ActionTypes = SetHistorylinesAction | AddHistorylineAction | UpdateHistorylineAction | RemoveHistorylineAction;
