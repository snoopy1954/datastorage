import { Cd } from '../../../../../backend/src/types/music';

export const SET_CDS = 'SET_CDS';
export const ADD_CD  = 'ADD_CD';
export const UPDATE_CD = 'UPDATE_CD';
export const REMOVE_CD = 'REMOVE_CD';
export const EXCHANGE_CDS = 'EXCHANGE_CDS';

interface SetCdsAction {
    type: typeof SET_CDS;
    payload: Cd[];
}

interface AddCdAction {
    type: typeof ADD_CD;
    payload: Cd;
}

interface UpdateCdAction {
    type: typeof UPDATE_CD;
    payload: Cd;
}

interface RemoveCdAction {
    type: typeof REMOVE_CD;
    payload: string;
}

interface ExchangeCdsAction {
    type: typeof EXCHANGE_CDS;
    payload: Cd[];
}

export type DispatchSetCds = (arg: SetCdsAction) => (SetCdsAction);
export type DispatchAddCd = (arg: AddCdAction) => (AddCdAction);
export type DispatchUpdateCd = (arg: UpdateCdAction) => (UpdateCdAction);
export type DispatchRemoveCd = (arg: RemoveCdAction) => (RemoveCdAction);
    
export type ActionTypes = SetCdsAction | AddCdAction | UpdateCdAction | RemoveCdAction | ExchangeCdsAction;
    