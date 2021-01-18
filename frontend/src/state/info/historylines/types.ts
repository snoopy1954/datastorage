import { Historyline } from '../../../../../backend/src/types/logging';

export const SET_HISTORYLINES = 'SET_HISTORYLINES';
export const ADD_HISTORYLINE  = 'ADD_HISTORYLINE';

interface SetHistorylinesAction {
    type: typeof SET_HISTORYLINES;
    payload: Historyline[];
}

interface AddHistorylineAction {
    type: typeof ADD_HISTORYLINE;
    payload: Historyline;
}

export type DispatchSetHistorylines = (arg: SetHistorylinesAction) => (SetHistorylinesAction);
export type DispatchAddHistoryline = (arg: AddHistorylineAction) => (AddHistorylineAction);
    
export type ActionTypes = SetHistorylinesAction | AddHistorylineAction;
    