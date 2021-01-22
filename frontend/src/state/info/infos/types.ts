import { Info } from '../../../../../backend/src/types/logging';

export const SET_COMMENT = 'SET_COMMENT';
export const UPDATE_COMMENT  = 'UPDATE_COMMENT';

interface SetInfoAction {
    type: typeof SET_COMMENT;
    payload: Info;
}

interface UpdateInfoAction {
    type: typeof UPDATE_COMMENT;
    payload: Info;
}

export type DispatchSetInfo = (arg: SetInfoAction) => (SetInfoAction);
export type DispatchUpdateInfo = (arg: UpdateInfoAction) => (UpdateInfoAction);
    
export type ActionTypes = SetInfoAction | UpdateInfoAction;
    